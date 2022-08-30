import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, setDoc, updateDoc, doc,
} from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const dbfdata = {
  654: ['test1', 6],
  456: ['test2', 10],
  457: ['test3', 3],
  231: ['test4', 90],
  766: ['test5', 5],
  312: ['test6', 3],
  645: ['test8', 15],
  987: ['test9', 25],
  345: ['test10', 35],
  646: ['test11', 45],
  978: ['test12', 55],
};

// async function setDbTest() {
//   await setDoc(doc(db, 'ladder', 'yrGVeT6Z4XL3hUSnQ0m3'), dbfdata);
// }
// setDbTest();

/** *********************
 TEST: Firebase DB
********************** */
// Get a list of cities from your database
async function getLadder() {
  const ladderCol = collection(db, 'ladder');
  const ladderSnapshot = await getDocs(ladderCol);
  const ladderList = ladderSnapshot.docs.map((dbDoc) => dbDoc.data());
  // console.log(ladderList);
  return ladderList;
}

async function getTargetPosition() {
  const targetCol = collection(db, 'targetPosition');
  const targetSnapshot = await getDocs(targetCol);
  const targetList = targetSnapshot.docs.map((dbDoc) => dbDoc.data());
  // console.log(targetList);
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
