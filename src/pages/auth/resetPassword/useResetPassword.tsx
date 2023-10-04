import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import user from "@shared/classes/user";
import { ResetPasswordValues } from "@shared/types/user";
import { isFirebaseError } from "@shared/helpers/utilis";

export default function useResetPassword() {
	const [isLoading, setIsLoading] = useState(false);
	const { onSubmit, reset, getInputProps } = useForm<ResetPasswordValues>({
		initialValues: {
			email: "",
		},

		validate: {
			email: (value) =>
				!value
					? "Email is required"
					: !/^\S+@\S+$/.test(value)
					? "Invalid email"
					: null,
		},
	});

	const handleSubmit = async (values: ResetPasswordValues) => {
		try {
			setIsLoading((prev) => !prev);
			await user.resetPassword(values);
			showNotification({
				title: "Success",
				message: "Reset email has been sent to your inbox",
				color: "green",
			});
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
