import { Flex, Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

type ViewSlotProps = {
	main: string | undefined;
	alternate: string;
};

export default function ViewSlot({ main, alternate }: ViewSlotProps) {
	return (
		<Text>
			{main || (
				<Flex>
					<Text size="sm" c="gray">
						{alternate}
					</Text>
					<IconExclamationCircle color="orange" />
				</Flex>
			)}
		</Text>
	);
}
