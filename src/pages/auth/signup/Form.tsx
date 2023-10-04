import { TextInput, PasswordInput, Button, Select } from "@mantine/core";
import { IconMail, IconUser, IconLock } from "@tabler/icons-react";
import useSignup from "./useSignup";

export default function Form() {
	const { onSubmit, handleSubmit, isLoading, getInputProps } = useSignup();
	return (
		<form onSubmit={onSubmit((values) => handleSubmit(values))}>
			<TextInput
				withAsterisk
				label="Name"
				placeholder="Enter Your Name"
				leftSection={<IconUser size={20} />}
				mb="lg"
				{...getInputProps("name")}
			/>
			<TextInput
				withAsterisk
				label="Email Address"
				placeholder="your@email.com"
				leftSection={<IconMail size={20} />}
				mb="lg"
				{...getInputProps("email")}
			/>

			<Select
				label="User Type"
				placeholder="Sender or Biker"
				data={["sender", "biker"]}
				mb="lg"
				{...getInputProps("type")}
			/>

			<PasswordInput
				withAsterisk
				label="Password"
				leftSection={<IconLock size={20} />}
				mb="lg"
				{...getInputProps("password")}
			/>

			<PasswordInput
				withAsterisk
				label="Confirm Password"
				leftSection={<IconLock size={20} />}
				mb="lg"
				{...getInputProps("confirmPassword")}
			/>

			<Button type="submit" fullWidth mb="lg" loading={isLoading}>
				Submit
			</Button>
		</form>
	);
}
