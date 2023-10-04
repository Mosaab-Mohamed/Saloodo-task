import { useContext } from "react";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconBox, IconMapPinFilled } from "@tabler/icons-react";
import { AppContext } from "../../shared/AppContext";
import useNewParcel from "./useNewParcel";

export default function NewParcel() {
	const { userData } = useContext(AppContext);
	const [opened, { open, close }] = useDisclosure(false);
	const { onSubmit, handleSubmit, isLoading, getInputProps } = useNewParcel();

	if (userData?.type === "biker") return null;
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Create a New Parcel"
				centered
			>
				<form onSubmit={onSubmit((values) => handleSubmit(values, close))}>
					<TextInput
						label="Parcel Name"
						placeholder="Enter a parcel name"
						leftSection={<IconBox size={20} />}
						mb="lg"
						{...getInputProps("name")}
					/>
					<TextInput
						label="Pick up Address"
						placeholder="Enter the detailed pick up address"
						leftSection={<IconMapPinFilled size={20} />}
						mb="lg"
						{...getInputProps("pickupPoint")}
					/>
					<TextInput
						label="Drop off Address"
						placeholder="Enter the detailed drop off address"
						leftSection={<IconMapPinFilled size={20} />}
						mb="lg"
						{...getInputProps("dropoffPoint")}
					/>
					<Button type="submit" loading={isLoading}>
						Create
					</Button>
				</form>
			</Modal>

			<Button leftSection={<IconPlus />} onClick={open} mb="xl">
				Create a parcel
			</Button>
		</>
	);
}
