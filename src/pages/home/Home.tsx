import AppProvider from "./shared/AppContext";
import Layout from "./Layout";

export default function Home() {
	return (
		<AppProvider>
			<Layout />
		</AppProvider>
	);
}
