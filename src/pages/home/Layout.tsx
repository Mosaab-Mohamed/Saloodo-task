import { useContext } from "react";
import { Container } from "@mantine/core";
import { AppContext } from "./shared/AppContext";
import Header from "./shared/Header";
import BikerPanel from "./BikerPanel";
import SenderPanel from "./SenderPanel";

export default function Layout() {
	const { userData } = useContext(AppContext);
	return (
		<>
			<Header />
			<Container size="md">
				{userData?.type === "biker" ? <BikerPanel /> : <SenderPanel />}
			</Container>
		</>
	);
}
