import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebase_app from '../config';

const db = getFirestore(firebase_app);
export default async function getDocument(collection, id) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
