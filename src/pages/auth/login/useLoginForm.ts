import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import user from "@shared/classes/user";
import { LoginUserValues } from "@shared/types/user";
import { isFirebaseError } from "@shared/helpers/utilis";

export default function useLoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const { onSubmit, reset, getInputProps } = useForm<LoginUserValues>({
		initialValues: {
			email: "",
			password: "",
			persistLogged: false,
		},

		validate: {
			email: (value) =>
				!value
					? "Email is required"
					: !/^\S+@\S+$/.test(value)
					? "Invalid email"
					: null,
			password: (value) => (!value ? "Password is required" : null),
		},
	});

	const handleSubmit = async (values: LoginUserValues) => {
		try {
			setIsLoading((prev) => !prev);
			await user.login(values);
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
