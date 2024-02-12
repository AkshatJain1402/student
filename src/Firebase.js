// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAP75W4KsnXxc9s_-d33KOppvK_vsd928",
  authDomain: "student-bus-boarding.firebaseapp.com",
  databaseURL: "https://student-bus-boarding-default-rtdb.firebaseio.com",
  projectId: "student-bus-boarding",
  storageBucket: "student-bus-boarding.appspot.com",
  messagingSenderId: "105361929874",
  appId: "1:105361929874:web:9850481b1649728d16184b",
  measurementId: "G-K2DGWBK5XY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
const analytics = getAnalytics(app);
