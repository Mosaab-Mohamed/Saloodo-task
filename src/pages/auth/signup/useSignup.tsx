import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import user from "@shared/classes/user";
import { SignupUserValues } from "@shared/types/user";
import { isFirebaseError } from "@shared/helpers/utilis";

export default function useSignup() {
	const [isLoading, setIsLoading] = useState(false);
	const { onSubmit, reset, getInputProps } = useForm<SignupUserValues>({
		initialValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			type: undefined,
		},

		validate: {
			name: (value) => (!value ? "Name is required" : null),
			email: (value) =>
				!value
					? "Email is required"
					: !/^\S+@\S+$/.test(value)
					? "Invalid email"
					: null,
			password: (value) => (!value ? "Password is required" : null),
			confirmPassword: (value, values) =>
				values.password !== value ? "Password must match" : null,
			type: (value) => (!value ? "User Type is required" : null),
		},
	});

	const handleSubmit = async (values: SignupUserValues) => {
		try {
			setIsLoading((prev) => !prev);
			await user.signup(values);
		} catch (error) {
			if (isFirebaseError(error))
				showNotification({
					title: "Somethine went wrong",
					message: error.message,
					color: "red",
					withBorder: true,
				});
		} finally {
			setIsLoading(false);
			reset();
		}
	};

	return { onSubmit, handleSubmit, isLoading, getInputProps };
}
