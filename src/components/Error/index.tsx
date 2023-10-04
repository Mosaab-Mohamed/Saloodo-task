import { Center, Alert as MantineAlert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type ErrorProps = { message: string };

export function Error({ message }: ErrorProps) {
	return (
		<Center>
			<MantineAlert color="red" title="Error" icon={<IconInfoCircle />}>
				{message}
			</MantineAlert>
		</Center>
	);
}
