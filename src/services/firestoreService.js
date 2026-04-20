import { db, isFirebaseConfigured } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const localStore = {
  read: (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  write: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export async function readUserDocument(collection, uid, defaultValue) {
  if (!uid) return defaultValue;

  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, collection, uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : defaultValue;
    } catch (error) {
      console.error(`Failed to read ${collection} for ${uid}:`, error);
    }
  }

  return localStore.read(`${collection}_${uid}`) ?? defaultValue;
}

export async function writeUserDocument(collection, uid, data) {
  if (!uid) return;

  if (isFirebaseConfigured) {
    try {
      await setDoc(doc(db, collection, uid), data);
      return;
    } catch (error) {
      console.error(`Failed to save ${collection} for ${uid}:`, error);
    }
  }

  localStore.write(`${collection}_${uid}`, data);
}
