// src/services/dbService.ts
import { db } from '../firebaseConfig';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';
import Admin from '../models/Admin';
import Company from '../models/Company';
import Investor from '../models/Investor';
import User from '../models/User';
import { UserType } from '../utils/enums';
import { handleFirebaseError } from './FirebaseErrorService';
import { FirebaseError } from 'firebase/app';


interface HasToJson {
  toJson: () => { [key: string]: any };
}

// generic function to fetch T obj with from Json func that belong to spetsific user
// for exampke : likes, invests...
export const fetchForUser = async <T>(
  collectionName: string,
  userId: string,
  fromJson: (json: any) => T
): Promise<T[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => fromJson(doc.data()));
  } catch (error: any) {
    console.error(`Error fetching ${collectionName} for user from db: `, error);
    handleFirebaseError(error as FirebaseError);
    throw error;
  }
};

// generic func for save T obj with toJson func to db
//for example: like\invest
export const saveToDb = async <T extends HasToJson>(
  collectionName: string,
  docId: string | null,
  data: T
) => {
  try {
    if (docId) {
      await setDoc(doc(db, collectionName, docId), data.toJson());
    } else {
      await addDoc(collection(db, collectionName), data.toJson());
    }
    console.log(`${collectionName} saved successfully`);
  } catch (error: any) {
    console.error(`Error saving ${collectionName} to db: `, error);
    handleFirebaseError(error as FirebaseError);
    throw error;
  }
};

// func for selete any cind of doc
// for example: user,like,invest etc...
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    console.log(`${collectionName} document deleted successfully`);
  } catch (error: any) {
    console.error(`Error deleting document from ${collectionName}: `, error);
    handleFirebaseError(error as FirebaseError);
    throw error;
  }
};

// user
export const saveUserToDb = async (user: User) => {
  try {
    await setDoc(doc(db, 'users', user.uid), user.userToJSON());
    console.log('User data saved successfully');
  } catch (error) {
    console.error('Error saving user data: ', error);
    handleFirebaseError(error as FirebaseError);
    throw error;
  }
};

export const fetchUserFromDb = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const { userType, name, email } = userData;

      switch (userType) {
        case UserType.Investor:
          return Investor.fromJSON(userData);
        case UserType.Company:
          return Company.fromJSON(userData);
        case UserType.Admin:
          return new Admin(uid, name, email, userType);
        default:
          return new User(uid, name, email, userType);
      }
    }
  } catch (error) {
    console.error('Error fetch user feom db: ', error);
    handleFirebaseError(error as FirebaseError);
  }

  return null;
};
