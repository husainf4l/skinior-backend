import { Inject, Injectable } from '@nestjs/common';
import { firestorePointVs1 } from '../firebase/firebase.config';

@Injectable()
export class PointsV2Service {

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

}
