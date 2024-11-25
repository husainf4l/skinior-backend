import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firebasePoint, firestorePoint, firestorePointVs1 } from '../firebase/firebase.config';


@Injectable()
export class PointsUsersService {

    private readonly users = firestorePoint.collection('users');
    private readonly transactions = firestorePoint.collection('users');



    private readonly pointsTransactions = firestorePointVs1.collection('pointsTransactions');
    private readonly vs1Users = firestorePointVs1.collection('users');


    private parseFirestoreTimestamp(timestamp: { _seconds: number; _nanoseconds: number }): Date {
        return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
    }

    async getAllUsers(): Promise<any[]> {
        const snapshot = await this.users.get();
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

    async getOldUsers2(): Promise<any[]> {
        const snapshot = await this.vs1Users.where('version', '==', null).get();
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

    async getOldUsers(): Promise<FirestoreUser[]> {
        const snapshot = await this.vs1Users.get(); // Fetch all documents
        const users = snapshot.docs
            .map((doc) => {
                const data = doc.data() as FirestoreUser;
                return { id: doc.id, ...data };
            })
            .filter((user) => user.version === undefined); // Check for missing `version`

        if (users.length === 0) {
            throw new Error('No users found with a missing version field.');
        }

        return users;
    }

    /**
     * Add a user to Firestore
     */
    async addUser(user: any): Promise<void> {
        await this.users.add(user);
    }

    /**
     * Get a user by ID from Firestore
     */
    async getUserById(userId: string): Promise<any> {
        const doc = await this.vs1Users.doc(userId).get();
        if (!doc.exists) {
            throw new Error('User not found');
        }
        return { id: doc.id, ...doc.data() };
    }

    async getUserWallet2(userId: string): Promise<any> {
        const snapshot = await this.vs1Users.doc(userId).collection('redeemPointsRequest').get()
        return snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                ...data,
                id: doc.id,

            };
        });
    }

    async getUserTransactions(userId: string): Promise<any> {
        const snapshot = await this.pointsTransactions.where('UserUid', '==', userId).get()
        return snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                ...data,
                id: doc.id,

            };
        });
    }

    async getUserByNameContains(substring: string): Promise<FirestoreUser[]> {
        const snapshot = await this.vs1Users.get();

        const users = snapshot.docs.map((doc) => {
            const data = doc.data() as FirestoreUser; // Cast data to FirestoreUser type
            return { id: doc.id, ...data };
        });

        const filteredUsers = users.filter(
            (user) => user.UserName?.toLowerCase().includes(substring.toLowerCase())
        );

        if (filteredUsers.length === 0) {
            throw new Error(`No users found containing: ${substring}`);
        }

        return filteredUsers;
    }



}
