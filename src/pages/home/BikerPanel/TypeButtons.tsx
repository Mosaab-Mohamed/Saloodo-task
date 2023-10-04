import { Box, Button, Flex } from "@mantine/core";
import { BikerParcelType } from "@shared/types/parcel";

type TypeButtonsProps = {
	type: BikerParcelType;
	setType: React.Dispatch<React.SetStateAction<BikerParcelType>>;
};
export default function TypeButtons({ type, setType }: TypeButtonsProps) {
	return (
		<Box w="fit-content" m="0 auto 50px">
			<Flex gap="sm">
				<Button
					variant={type === "current" ? "gradient" : "default"}
					radius="xl"
					onClick={() => setType("current")}
				>
					Current Parcels
				</Button>
				<Button
					variant={type === "completed" ? "gradient" : "default"}
					radius="xl"
					onClick={() => setType("completed")}
				>
					Your Completed Parcels
				</Button>
			</Flex>
		</Box>
	);
}
