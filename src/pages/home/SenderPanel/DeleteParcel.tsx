import { useState } from "react";
import {
	Box,
	Text,
	Flex,
	Button,
	Modal,
	Title,
	ActionIcon,
	Alert,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconExclamationCircle, IconTrash } from "@tabler/icons-react";
import { Parcel } from "@shared/types/parcel";
import parcelInstance from "@shared/classes/parcel";
import { showNotification } from "@mantine/notifications";
import { isFirebaseError } from "@shared/helpers/utilis";
import { RenderIfTruthy } from "@components/RenderIfTruthy";

type DeletParcelProps = {
	parcel: Parcel | undefined;
};

export default function DeletParcel({ parcel }: DeletParcelProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure();

	const handleDelete = async () => {
		try {
			setIsLoading(() => true);
			await parcelInstance.delete(parcel?.id || "");
			close();
			showNotification({
				title: "Success",
				message: "Parcel has been deleted succesfully",
				color: "green",
			});
		} catch (error) {
			if (isFirebaseError(error)) {
				showNotification({
					title: "Something went wrong",
					message: error.message,
					color: "red",
				});
			}
		} finally {
			setIsLoading(() => false);
		}
	};

	return (
		<>
			<ActionIcon radius="xl" color="red" onClick={open}>
				<IconTrash size={20} />
			</ActionIcon>
			<Modal
				opened={opened}
				onClose={close}
				title={<Title order={4}>Delete Parcel</Title>}
				centered
			>
				<RenderIfTruthy prop={parcel?.status === "picked"}>
					<Alert icon={<IconExclamationCircle />} color="orange">
						You can't delete this parcel since it has been picked
					</Alert>
				</RenderIfTruthy>
				<RenderIfTruthy prop={parcel?.status !== "picked"}>
					<Text mb="xl">
						Are you sure you want to delete {parcel?.name}
					</Text>
					<Flex gap="sm">
						<Button variant="filled" color="gray">
							Cancel
						</Button>
						<Button
							variant="filled"
							color="red"
							loading={isLoading}
							onClick={handleDelete}
						>
							Confirm
						</Button>
					</Flex>
				</RenderIfTruthy>
			</Modal>
		</>
	);
}
