// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import uniqid from "uniqid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNmtSSWmmEcJnTgcBIVsXjkAfKlyM-RF4",
  authDomain: "wheres-waldo-69dbd.firebaseapp.com",
  projectId: "wheres-waldo-69dbd",
  storageBucket: "wheres-waldo-69dbd.appspot.com",
  messagingSenderId: "1096768444000",
  appId: "1:1096768444000:web:53f13d7f4a41b5f4cf1505",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getImageData(stage) {
  const docRef = doc(db, "image-data", `${stage}`);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return data;
}

async function makeSubmission(stage, time, name) {
  if (name === undefined) name = "no-name";
  const data = await getImageData(stage);
  const submissions = [
    ...data.submissions,
    { id: uniqid(), name: name, time: time },
  ];
  const characters = [...data.characters];
  const waldo = { ...data.waldo };

  await setDoc(doc(db, "image-data", stage), {
    submissions,
    characters,
    waldo,
  });
}

export function getDB() {
  return db;
}

export { getImageData, makeSubmission };
