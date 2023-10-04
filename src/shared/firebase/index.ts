import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDgkFYwHnkEmeVnWHb6lnEalousGI84TJk",
	authDomain: "saloodo-bd75d.firebaseapp.com",
	projectId: "saloodo-bd75d",
	storageBucket: "saloodo-bd75d.appspot.com",
	messagingSenderId: "448358628014",
	appId: "1:448358628014:web:7b37136a3b933552e18b3f",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage();
