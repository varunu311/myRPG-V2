import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const firebaseConfig = {
  apiKey: "AIzaSyAeaeXCL3DOQJ9mfHfhlMBTR-ODttrKbgw",
  authDomain: "myrpg-604aa.firebaseapp.com",
  projectId: "myrpg-604aa",
  storageBucket: "myrpg-604aa.appspot.com",
  messagingSenderId: "286436818453",
  appId: "1:286436818453:web:7080beefc82871417bd81c",
  measurementId: "G-MNVNDPTHD4"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_Auth= getAuth(FIREBASE_APP);
