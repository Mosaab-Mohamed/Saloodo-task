import { TextInput, PasswordInput, Checkbox, Button } from "@mantine/core";
import { IconMail, IconLock } from "@tabler/icons-react";
import useLoginForm from "./useLoginForm";

export default function Form() {
	const { onSubmit, handleSubmit, isLoading, getInputProps } = useLoginForm();
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
			<PasswordInput
				withAsterisk
				label="Password"
				leftSection={<IconLock size={20} />}
				mb="lg"
				{...getInputProps("password")}
			/>

			<Checkbox
				label="Remember Me"
				size="xs"
				mb="lg"
				{...getInputProps("persistLogged", { type: "checkbox" })}
			/>

			<Button type="submit" fullWidth mb="lg" loading={isLoading}>
				Submit
			</Button>
		</form>
	);
}
