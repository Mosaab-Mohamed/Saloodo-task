import { useState } from "react";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { isFirebaseError } from "@shared/helpers/utilis";
import { ParcelFormValues } from "@shared/types/parcel";
import parcel from "@shared/classes/parcel";

export default function useNewParcel() {
	const [isLoading, setIsLoading] = useState(false);
	const { onSubmit, getInputProps, reset } = useForm<ParcelFormValues>({
		initialValues: {
			name: "",
			pickupPoint: "",
			dropoffPoint: "",
		},
		validate: {
			name: (value) => (!value ? "Name is required" : null),
			pickupPoint: (value) => (!value ? "Pickup address is required" : null),
			dropoffPoint: (value) =>
				!value ? "Drop off address is required" : null,
		},
	});

	const handleSubmit = async (
		values: ParcelFormValues,
		callBack?: () => void
	) => {
		try {
			setIsLoading((prev) => !prev);
			await parcel.create(values);
			showNotification({
				title: "Success",
				message: "Parcel has been created succefully",
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
			setIsLoading(false);
			reset();
			callBack && callBack();
		}
	};

	return { onSubmit, handleSubmit, isLoading, getInputProps };
}
