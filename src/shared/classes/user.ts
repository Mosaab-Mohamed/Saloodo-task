import {
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@shared/firebase";
import type {
	User as UserDocumentType,
	LoginUserValues,
	SignupUserValues,
	ResetPasswordValues,
} from "../types/user";

interface UserInterface {
	/**
	 * Sinup and save user as a member in users' collection
	 * @param {SignupUserValues} values - The user's signup values.
	 * @returns {Promise<void>}
	 */
	signup(values: SignupUserValues): Promise<void>;

	/**
	 * login user with email and password
	 * @param values - The user's login values.
	 * @returns {Promise<void>}
	 */
	login(values: LoginUserValues): Promise<void>;

	/**
	 * Sing user out
	 * @returns {Promise<void>}
	 */
	signout(): Promise<void>;

	/**
	 * Reset password if it's forggoten
	 * @param {ResetPasswordValues} email - The user's email value
	 */
	resetPassword({ email }: ResetPasswordValues): Promise<void>;

	/**
	 * Fetch the user's info that's stored in users collection
	 * @returns {Promise<UserDocumentType | undefined>}
	 */
	getCurrentUser(): Promise<UserDocumentType | undefined>;
}

class User implements UserInterface {
	public async signup(values: SignupUserValues) {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			values.email,
			values.password
		);
		await updateProfile(user, { displayName: values.name });
		await setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			name: user.displayName,
			email: user.email,
			joinedAt: new Date().toLocaleDateString(),
			type: values.type,
		});
	}

	public async login(values: LoginUserValues) {
		if (!values.persistLogged)
			await setPersistence(auth, browserSessionPersistence);
		await signInWithEmailAndPassword(auth, values.email, values.password);
	}

	public async resetPassword({ email }: ResetPasswordValues) {
		await sendPasswordResetEmail(auth, email);
	}

	public async signout() {
		await signOut(auth);
		window.location.assign("/login");
	}

	public async getCurrentUser() {
		if (!auth.currentUser) return;

		const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
		return userDoc.data() as UserDocumentType;
	}
}

const user = new User();

export default user;
