import { Table, Text, Flex, Alert } from "@mantine/core";
import { IconDatabaseExclamation } from "@tabler/icons-react";
import ViewParcel from "../shared/ViewParcel";
import useFetchList from "../shared/useFetchList";
import DeletParcel from "./DeleteParcel";
import StatusBadge from "../shared/StatusBadge";
import NewParcel from "./NewParcel";
import { RenderIfTruthy } from "@components/RenderIfTruthy";

export default function SenderPanel() {
	const { list } = useFetchList();

	return (
		<>
			<NewParcel />
			<RenderIfTruthy prop={list.length < 1}>
				<Alert
					variant="light"
					color="red"
					icon={<IconDatabaseExclamation />}
				>
					You haven't created any parcels yet
				</Alert>
			</RenderIfTruthy>
			<RenderIfTruthy prop={list.length > 0}>
				<Table verticalSpacing="sm" striped highlightOnHover>
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
									<Flex gap="sm">
										<ViewParcel parcel={parcel} />

										<DeletParcel parcel={parcel} />
									</Flex>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</RenderIfTruthy>
		</>
	);
}
