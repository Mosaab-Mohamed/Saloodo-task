import { Box, Flex, Text, Divider, Modal, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import type { Parcel } from "@shared/types/parcel";
import StatusBadge from "./StatusBadge";
import ViewSlot from "./ViewSlot";
import classes from "../style.module.scss";

type ViewParcelProps = {
	parcel: Parcel | undefined;
};

export default function ViewParcel({ parcel }: ViewParcelProps) {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<ActionIcon radius="xl" onClick={open}>
				<IconEye size={20} />
			</ActionIcon>
			<Modal
				opened={opened}
				onClose={close}
				size="xl"
				title="Parcel Details"
				centered
			>
				<Box className={classes.view_parcel}>
					<Flex gap="md" py="xs">
						<Text size="sm" fw="bold">
							Parcel Name
						</Text>
						<Text>{parcel?.name}</Text>
					</Flex>
					<Divider />
					<Flex gap="md" py="xs">
						<Text size="sm" fw="bold">
							Pick up Point
						</Text>
						<Text>{parcel?.pickupPoint}</Text>
					</Flex>
					<Divider />
					<Flex gap="md" py="xs">
						<Text size="sm" fw="bold">
							Drop off Point
						</Text>
						<Text>{parcel?.dropoffPoint}</Text>
					</Flex>
					<Divider />
					<Flex gap="md" py="xs">
						<Text size="sm" fw="bold">
							Biker Name
						</Text>
						<ViewSlot main={parcel?.bikerName} alternate="No Biker yet" />
					</Flex>
					<Divider />
					<Flex gap="md" py="xs">
						<Text size="sm" fw="bold">
							Pick up Time
						</Text>
						<ViewSlot
							main={parcel?.pickupTimestamp}
							alternate="Not Picked yet"
						/>
					</Flex>
					<Divider />
					<Flex gap="md" py="xs">
						<Text size="sm" fw="bold">
							Drop off Time
						</Text>
						<ViewSlot
							main={parcel?.dropoffTimestamp}
							alternate="Not Dropped yet"
						/>
					</Flex>
					<Divider />
					<Flex gap="md" py="xs">
						<Text size="sm" fw="bold">
							Status
						</Text>
						<Text>
							<StatusBadge status={parcel?.status} />
						</Text>
					</Flex>
				</Box>
			</Modal>
		</>
	);
}
