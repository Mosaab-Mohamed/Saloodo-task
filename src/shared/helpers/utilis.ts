import { FirebaseError } from "firebase/app";

export const isInstanceOf = <T>(obj: any): obj is T => {
	if (!(obj instanceof Object) || obj instanceof Array) return false;
	const keys = Object.keys(obj) as Array<keyof T>;
	return keys.every((key) => key in obj);
};

export const isFirebaseError = (error: unknown): error is FirebaseError => {
	return isInstanceOf<FirebaseError>(error);
};

export const isEmptyValues = (values: { [key: string]: any }): boolean => {
	return Object.values(values).every((value) => value === "");
};
