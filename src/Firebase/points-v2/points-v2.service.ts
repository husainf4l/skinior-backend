import { Inject, Injectable } from '@nestjs/common';
import { firestorePointVs1 } from '../firebase/firebase.config';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';


@Injectable()
export class PointsV2Service {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore, private prisma: PrismaService, @Inject('FIREBASE_APP_POINTVS1') private readonly firebaseAppPointVs1: admin.app.App,
    ) { }

    private readonly pointsTransactions = firestorePointVs1.collection('pointsTransactions');
    private readonly vs1Users = firestorePointVs1.collection('users');
    private parseFirestoreTimestamp(timestamp: { _seconds: number; _nanoseconds: number }): Date {
        return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
    }

    async getAllUsers(): Promise<any[]> {
        const snapshot = await this.vs1Users.orderBy('lastSeen', 'desc').get();
        return snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                ...data,
                id: doc.id,
                createdAt: data.createdAt ? this.parseFirestoreTimestamp(data.createdAt) : null,
                updatedAt: data.updatedAt ? this.parseFirestoreTimestamp(data.updatedAt) : null,
                lastSeen: data.lastSeen ? this.parseFirestoreTimestamp(data.lastSeen) : null,
            };
        });
    }
    async getUserByUid(UserUid: string) {
        const doc = await this.vs1Users.doc(UserUid).get();

        if (!doc.exists) {
            throw new Error('User not found');
        }
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            createdOn: data.createdOn ? this.parseFirestoreTimestamp(data.createdOn) : null,
            updatedAt: data.updatedAt ? this.parseFirestoreTimestamp(data.updatedAt) : null,
            lastSeen: data.lastSeen ? this.parseFirestoreTimestamp(data.lastSeen) : null,
        };

    }

    async getUserTransactions(UserUid: string) {
        const snapshot = await this.pointsTransactions
            .where('UserUid', '==', UserUid)
            .orderBy('createdOn', 'desc')
            .get(); return snapshot.docs.map((doc) => {
                const data = doc.data();

                return {
                    ...data,
                    id: doc.id,
                    createdOn: data.createdOn ? this.parseFirestoreTimestamp(data.createdOn) : null,
                    checkedOn: data.checkedOn ? this.parseFirestoreTimestamp(data.checkedOn) : null,
                };
            });

    }

    async getTransactionById(id: string) {

        const doc = await this.pointsTransactions.doc(id).get();

        if (!doc.exists) {
            throw new Error('Transaction not found');
        }
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            createdOn: data.createdOn ? this.parseFirestoreTimestamp(data.createdOn) : null,
        };
    }


    async getAllTransactions() {
        const cacheKey = `getAllTransactions`;

        // Check for cached data
        const cachedTransactions = await this.cacheManager.get<any[]>(cacheKey);
        if (cachedTransactions) {
            console.log(`Returning cached Transactions`);
            return cachedTransactions;
        }

        // Fetch data from Firestore
        const snapshot = await this.pointsTransactions.orderBy('createdOn', 'desc').get();
        const transactions = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                ...data,
                id: doc.id,
                createdOn: data.createdOn ? this.parseFirestoreTimestamp(data.createdOn) : null,
                checkedOn: data.checkedOn ? this.parseFirestoreTimestamp(data.checkedOn) : null,
            };
        });

        // Cache the fetched data
        await this.cacheManager.set(cacheKey, transactions, { ttl: 600 });

        return transactions;

    }

    async updatePoints(
        transactionId: string,
        data: {
            margoSales: number;
            papayaSales: number;
            lavaSales: number;
            bracket: number;
            currentPoints: number;
            invRef: string;
            UserUid: string;
            userName: string;
            posName: string;
            fcmToken: string;
        }
    ): Promise<void> {
        const {
            margoSales = 0,
            papayaSales = 0,
            lavaSales = 0,
            bracket = 0.08,
            currentPoints = 0,
            UserUid,
            userName,
            posName,
            invRef,
            fcmToken,
        } = data;

        // Calculate points
        const totalSales = margoSales + papayaSales + lavaSales;
        const transactionPoints = Math.round(totalSales * bracket);
        const newPoints = currentPoints + transactionPoints;

        try {
            await this.updateTransaction(transactionId, transactionPoints);

            await this.updateUserPoints(UserUid, newPoints);

            await this.logTransaction({
                transactionId,
                transactionPoints,
                userName,
                posName,
                invRef,
                margoSales,
                papayaSales,
                lavaSales,
                totalSales,
            });

            // Send notification to user
            await this.sendNotification(
                fcmToken,
                'تم اضافة النقاط',
                `تم اضافة ${transactionPoints} نقطة`
            );

            console.log(
                `Points updated successfully for user ${userName}. New points total: ${newPoints}`
            );
        } catch (error) {
            console.error(`Failed to update points for user ${userName}:`, error);
            throw new Error(`Failed to update points: ${error.message}`);
        }
    }

    private async updateTransaction(transactionId: string, transactionPoints: number): Promise<void> {
        await this.pointsTransactions.doc(transactionId).update({
            isChecked: true,
            points: transactionPoints,
            status: `تم اضافة ${transactionPoints} نقطة`,
            checkedOn: new Date(),
        });
    }

    private async updateUserPoints(UserUid: string, newPoints: number): Promise<void> {
        await this.vs1Users.doc(UserUid).update({
            points: newPoints,
        });
    }

    private async logTransaction(data: {
        transactionId: string;
        transactionPoints: number;
        userName: string;
        posName: string;
        invRef: string;
        margoSales: number;
        papayaSales: number;
        lavaSales: number;
        totalSales: number;
    }): Promise<void> {
        await this.prisma.companyPointsTransactions.create({
            data: {
                points: data.transactionPoints,
                userName: data.userName,
                posName: data.posName,
                invRef: data.invRef,
                margoSales: data.margoSales,
                papayaSales: data.papayaSales,
                lavaSales: data.lavaSales,
                totalSales: data.totalSales,
                transactionId: data.transactionId,
            },
        });
    }

    async sendNotification(token: string, title: string, body: string): Promise<void> {
        const firebaseApp = this.firebaseAppPointVs1;

        const message = {
            token,
            notification: { title, body },
        };

        try {
            const response = await firebaseApp.messaging().send(message);
            console.log('Notification sent successfully:', response);
        } catch (error) {
            console.error('Error sending notification:', error);
            throw new Error('Failed to send notification');
        }
    }


    async clearAllCache(): Promise<void> {
        const cache = this.cacheManager as any;
        if (cache.reset) {
            await cache.reset();
            console.log('All cache cleared');
        } else {
            console.warn('Cache store does not support reset operation');
        }
    }
}
