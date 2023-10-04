import { useState } from "react";
import { Table, Text, Flex, Alert } from "@mantine/core";
import { IconDatabaseExclamation } from "@tabler/icons-react";
import { RenderIfTruthy } from "@components/RenderIfTruthy";
import ViewParcel from "../shared/ViewParcel";
import useFetchList from "../shared/useFetchList";
import StatusBadge from "../shared/StatusBadge";
import PickDropParcel from "./PickDropParcel";
import TypeButtons from "./TypeButtons";

type BikerParcelType = "current" | "completed";

export default function BikerPanel() {
	const [type, setType] = useState<BikerParcelType>("current");
	const { list } = useFetchList(type);

	console.log(type);

	return (
		<>
			<TypeButtons type={type} setType={setType} />
			<RenderIfTruthy prop={list.length < 1}>
				<Alert
					variant="light"
					color="red"
					icon={<IconDatabaseExclamation />}
				>
					{type === "completed"
						? "You haven't completed any parcels yet"
						: "No current parcels"}
				</Alert>
			</RenderIfTruthy>
			<RenderIfTruthy prop={list.length > 0}>
				<Table.ScrollContainer minWidth={800}>
					<Table verticalSpacing="sm">
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Parcel Name</Table.Th>

								<Table.Th>Status</Table.Th>
								<Table.Th>Actions</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{list.map((parcel) => (
								<Table.Tr key={parcel.id}>
									<Table.Td>
										<Text fz="sm" fw={500}>
											{parcel.name}
										</Text>
									</Table.Td>

									<Table.Td>
										<StatusBadge status={parcel.status} />
									</Table.Td>
									<Table.Td>
										<Flex gap="sm" align="center">
											<ViewParcel parcel={parcel} />
											<RenderIfTruthy
												prop={parcel.status !== "deleivered"}
											>
												<PickDropParcel
													parcel={parcel}
													setType={setType}
												/>
											</RenderIfTruthy>
										</Flex>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</RenderIfTruthy>
		</>
	);
}
