import { useState, useContext, useEffect } from "react";
import { Box, Button, Modal } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { AppContext } from "../shared/AppContext";
import { BikerParcelType, Parcel } from "@shared/types/parcel";
import parcelInstance from "@shared/classes/parcel";
import { isFirebaseError } from "@shared/helpers/utilis";
import { showNotification } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

type PickDropParcelProps = {
	parcel: Parcel | undefined;
	setType: React.Dispatch<React.SetStateAction<BikerParcelType>>;
};
export default function PickDropParcel({
	parcel,
	setType,
}: PickDropParcelProps) {
	const { userData } = useContext(AppContext);
	const [timeStamp, setTimeStamp] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure();
	const isPicking = parcel?.status === "submitted";

	useEffect(() => {
		if (!Boolean(timeStamp)) return;
		setTimeStamp("");
	}, []);

	const handleSubmit = async () => {
		try {
			setIsLoading(() => true);
			if (isPicking) {
				await parcelInstance.pick({
					bikerId: userData?.id!,
					bikerName: userData?.name!,
					parcelId: parcel.id,
					time: timeStamp,
				});
			} else {
				await parcelInstance.drop(timeStamp, parcel?.id || "");
				setType("completed");
			}
			close();

			showNotification({
				title: "Success",
				message: `You ${
					isPicking ? "Picked" : "Dropped"
				} parcel successfully`,
				color: "green",
			});
		} catch (error) {
			if (isFirebaseError(error)) {
				showNotification({
					title: "Error",
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
			<Button
				onClick={open}
				size="xs"
				px="xl"
				color={parcel?.status === "submitted" ? "cyan" : "teal"}
				disabled={
					parcel?.status === "picked" && parcel.bikerId !== userData?.id
				}
			>
				{parcel?.status === "picked" && parcel.bikerId === userData?.id
					? "Drop"
					: "Pick"}
			</Button>
			<Modal
				opened={opened}
				onClose={close}
				title={
					parcel?.status === "submitted" ? "Pick Parcel" : "Drop Parcel"
				}
			>
				<Box>
					<DateTimePicker
						valueFormat="DD MMM YYYY hh:mm A"
						label={isPicking ? "Pick up Time" : "Drop off Time"}
						placeholder="Enter the current time"
						onChange={(e) => setTimeStamp(e?.toLocaleString()!)}
						minDate={new Date()}
						withAsterisk
						clearable
						mb="lg"
					/>
					<Button
						disabled={!Boolean(timeStamp)}
						loading={isLoading}
						onClick={handleSubmit}
					>
						Confirm
					</Button>
				</Box>
			</Modal>
		</>
	);
}
