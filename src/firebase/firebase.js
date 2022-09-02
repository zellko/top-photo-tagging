import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, setDoc, doc,
} from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/** *********************
Firebase DB
********************** */

async function getLadder() {
  let ladderList;
  try {
    const ladderCol = collection(db, 'ladder');
    const ladderSnapshot = await getDocs(ladderCol);
    ladderList = ladderSnapshot.docs.map((dbDoc) => dbDoc.data());
  } catch (error) {
    ladderList = 'error';
  }
  return ladderList;
}

async function getTargetPosition() {
  let targetList;
  try {
    const targetCol = collection(db, 'targetPosition');
    const targetSnapshot = await getDocs(targetCol);
    targetList = targetSnapshot.docs.map((dbDoc) => dbDoc.data());
  } catch (error) {
    targetList = 'error';
  }
  return targetList;
}

async function addPlayerToLadder(id, data) {
  await setDoc(doc(db, 'ladder', id.toString()), data);
}

async function updatePlayerLadder(id, newValue) {
  await setDoc(doc(db, 'ladder', id.toString()), newValue);
}

export {
  getLadder, getTargetPosition, addPlayerToLadder, updatePlayerLadder,
};
