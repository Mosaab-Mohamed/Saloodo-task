export type User = {
	id: string;
	name: string;
	email: string;
	type: UserType;
	parcels: string[];
};

export type LoginUserValues = {
	email: string;
	password: string;
	persistLogged: boolean;
};

export type SignupUserValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	type: UserType | undefined;
};

export type ResetPasswordValues = {
	email: string;
};

type UserType = "biker" | "sender";
