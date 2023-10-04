import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@shared/firebase";

export default function useAuthState() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) setIsLoggedIn(true);
			setIsChecking(false);
		});
	}, []);

	return { isLoggedIn, isChecking };
}
