import { Inject, Injectable } from '@nestjs/common';
import { firestorePointVs1 } from '../firebase/firebase.config';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore'; // Ensure you import Firestore Timestamp

@Injectable()
export class PointsV1Service {
  constructor(
    private prisma: PrismaService,
    @Inject('FIREBASE_APP_POINTVS1')
    private readonly firebaseAppPointVs1: admin.app.App,
  ) {}
  private readonly vs1Users = firestorePointVs1.collection('users');
  private readonly pointsTransactions = (UserUid: string) =>
    firestorePointVs1
      .collection('users')
      .doc(UserUid)
      .collection('pointsHistory');

  private parseFirestoreTimestamp(timestamp: {
    _seconds: number;
    _nanoseconds: number;
  }): Date {
    return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
  }

  async getAllUsers(): Promise<any[]> {
    const snapshot = await this.vs1Users.orderBy('lastseen', 'desc').get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt
          ? this.parseFirestoreTimestamp(data.createdAt)
          : null,
        updatedAt: data.updatedAt
          ? this.parseFirestoreTimestamp(data.updatedAt)
          : null,
        lastseen: data.lastseen
          ? this.parseFirestoreTimestamp(data.lastseen)
          : null,
        lastSeen: data.lastSeen
          ? this.parseFirestoreTimestamp(data.lastSeen)
          : null,
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
      createdOn: data.createdOn
        ? this.parseFirestoreTimestamp(data.createdOn)
        : null,
      updatedAt: data.updatedAt
        ? this.parseFirestoreTimestamp(data.updatedAt)
        : null,
      lastseen: data.lastseen
        ? this.parseFirestoreTimestamp(data.lastseen)
        : null,
      lastSeen: data.lastSeen
        ? this.parseFirestoreTimestamp(data.lastSeen)
        : null,
    };
  }

  async getUserTransactions(UserUid: string) {
    const snapshot = await this.pointsTransactions(UserUid)
      .orderBy('createdOn', 'desc')
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        ...data,
        id: doc.id,
        createdOn: data.createdOn
          ? this.parseFirestoreTimestamp(data.createdOn)
          : null,
        doneBy: data.doneBy ? this.parseFirestoreTimestamp(data.doneBy) : null,
      };
    });
  }

  async getTransactionById(transactionId: string, UserUid: string) {
    const doc = await this.pointsTransactions(UserUid).doc(transactionId).get();

    if (!doc.exists) {
      throw new Error('Transaction not found');
    }
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdOn: data.createdOn
        ? this.parseFirestoreTimestamp(data.createdOn)
        : null,
      doneBy: data.foneBy ? this.parseFirestoreTimestamp(data.doneBy) : null,
    };
  }

  async userWallet(UserUid: string) {
    const snapshot = await firestorePointVs1
      .collection('users')
      .doc(UserUid)
      .collection('redeemPointsRequest')
      .orderBy('createdOn', 'desc')
      .limit(3)
      .get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        ...data,
        id: doc.id,
        createdOn: data.createdOn
          ? this.parseFirestoreTimestamp(data.createdOn)
          : null,
      };
    });
  }

  async getAllTransactions(limit: number, toggle: boolean): Promise<any[]> {
    return;
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
    },
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
    } = data;

    // Calculate points
    const totalSales = margoSales + papayaSales + lavaSales;
    const transactionPoints = Math.round(totalSales * bracket);
    const newPoints = currentPoints + transactionPoints;

    try {
      await this.updateTransaction(
        transactionId,
        transactionPoints,
        bracket,
        UserUid,
      );

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

      console.log(
        `Points updated successfully for user ${userName}. New points total: ${newPoints}`,
      );
    } catch (error) {
      console.error(`Failed to update points for user ${userName}:`, error);
      throw new Error(`Failed to update points: ${error.message}`);
    }
  }

  private async updateTransaction(
    transactionId: string,
    transactionPoints: number,
    bracket: number,
    UserUid: string,
  ): Promise<void> {
    await this.pointsTransactions(UserUid)
      .doc(transactionId)
      .update({
        isChecked: true,
        points: `${transactionPoints}`,
        subTitle: `تم اضافة ${transactionPoints} نقطة`,
        checkedOn: new Date(),
        bracket: bracket,
      });
  }

  private async updateUserPoints(
    UserUid: string,
    newPoints: number,
  ): Promise<void> {
    await this.vs1Users.doc(UserUid).update({
      points: `${newPoints}`,
      redeem: `${newPoints / 10} JOD`,
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
        invRef: data.posName + data.invRef,
        margoSales: data.margoSales,
        papayaSales: data.papayaSales,
        lavaSales: data.lavaSales,
        totalSales: data.totalSales,
        transactionId: data.transactionId,
      },
    });
  }

  async sendNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
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

  async redeemAdd(data: {
    transactionId: string;
    UserUid: string;
    points: number;
    currentPoints: number;
  }) {
    const newPoints = data.currentPoints - data.points;

    const transactionPoints = -data.points;
    await this.pointsTransactions(data.UserUid)
      .doc(data.transactionId)
      .update({
        currentPoints: data.currentPoints,
        newBalance: newPoints,
        points: `${transactionPoints}`,
        doneBy: Timestamp.fromDate(new Date()),
        isChecked: true,
        subTitle: `تم صرف ${data.points} نقطة`,
      });
    await this.vs1Users.doc(data.UserUid).update({
      points: `${newPoints}`,
      redeem: `${newPoints / 10} JOD`,
    });
  }

  async editAdd(data: {
    UserUid: string;
    date: string;
    type: number;
    status: string;
    points: number;
  }) {
    try {
      console.log('Received data:', data);

      // Convert `date` to Firestore Timestamp
      const createdOnTimestamp = Timestamp.fromDate(new Date(data.date));

      // Add the document to Firestore
      await this.pointsTransactions(data.UserUid)
        .doc()
        .create({
          UserUid: data.UserUid,
          points: data.points,
          type: data.type,
          createdOn: createdOnTimestamp, // Firestore Timestamp
          isChecked: true,
          checkedOn: Timestamp.fromDate(new Date()), // Current timestamp
          status: data.status,
          image:
            'https://firebasestorage.googleapis.com/v0/b/pointsv1.appspot.com/o/%D8%AD%D8%B1%D9%83%D8%A7%D8%AA%2Finvoices.jpg?alt=media&token=5e1c8d26-4603-4398-a504-2d4059c1b731',
        });

      console.log('Document successfully created');
    } catch (error) {
      console.error('Error adding document:', error.message);
      throw error;
    }
  }
  async getCompanyTransactionById(transactionId: string): Promise<any> {
    try {
      const transaction = await this.prisma.companyPointsTransactions.findFirst(
        {
          where: {
            transactionId: transactionId,
          },
        },
      );

      return transaction
        ? { success: true, data: transaction }
        : { success: false, message: 'No data' };
    } catch (error) {
      console.error('Error fetching transaction:', error.message);
      throw error;
    }
  }

  async updateBracket(data: {
    UserUid: string;
    bracket: number;
  }): Promise<{ success: boolean; message: string }> {
    try {
      await this.vs1Users.doc(data.UserUid).update({
        bracket: data.bracket,
      });

      return { success: true, message: 'Bracket updated successfully.' };
    } catch (error) {
      console.error('Error updating bracket:', error);

      return {
        success: false,
        message: 'Failed to update bracket. Please try again.',
      };
    }
  }

  async updateAllUsers(): Promise<void> {
    try {
      const usersSnapshot = await this.vs1Users.get(); // Get all documents in the collection

      const batch = this.vs1Users.firestore.batch(); // Start a Firestore batch

      usersSnapshot.forEach((doc) => {
        const userRef = this.vs1Users.doc(doc.id); // Get a reference to each document
        // batch.update(userRef, { bracket: 0.8 });
      });

      await batch.commit(); // Commit the batch
      console.log('Bracket updated for all users.');
    } catch (error) {
      console.error('Error updating bracket for all users:', error);
    }
  }
}
