import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/** *********************
 TEST: Firebase DB
********************** */
// Get a list of cities from your database
async function getLadder() {
  const ladderCol = collection(db, 'ladder');
  const ladderSnapshot = await getDocs(ladderCol);
  const ladderList = ladderSnapshot.docs.map((doc) => doc.data());
  // console.log(ladderList);
  return ladderList;
}

async function getTargetPosition() {
  const targetCol = collection(db, 'targetPosition');
  const targetSnapshot = await getDocs(targetCol);
  const targetList = targetSnapshot.docs.map((doc) => doc.data());
  // console.log(targetList);
  return targetList;
}

export { getLadder, getTargetPosition };
