import { Badge } from "@mantine/core";
import { Status } from "@shared/types/parcel";

export default function StatusBadge({
	status,
}: {
	status: Status | undefined;
}) {
	return (
		<Badge
			color={
				status === "submitted"
					? "pink"
					: status === "picked"
					? "blue"
					: "green"
			}
			variant="filled"
		>
			{status}
		</Badge>
	);
}
