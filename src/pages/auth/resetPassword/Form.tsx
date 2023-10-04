import { TextInput, Button } from "@mantine/core";
import useResetPassword from "./useResetPassword";
import { IconMail } from "@tabler/icons-react";

export default function Form() {
	const { onSubmit, handleSubmit, isLoading, getInputProps } =
		useResetPassword();
	return (
		<form onSubmit={onSubmit((values) => handleSubmit(values))}>
			<TextInput
				withAsterisk
				label="Email Address"
				placeholder="your@email.com"
				leftSection={<IconMail size={20} />}
				mb="lg"
				{...getInputProps("email")}
			/>
			<Button type="submit" fullWidth mb="lg" loading={isLoading}>
				Submit
			</Button>
		</form>
	);
}
