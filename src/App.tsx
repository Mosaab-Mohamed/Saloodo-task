import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Routes } from "./router/Routes";
import "./shared/styles/main.scss";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

const router = createBrowserRouter(Routes);

export default function App() {
	return (
		<MantineProvider>
			<Notifications />
			<RouterProvider router={router} />
		</MantineProvider>
	);
}
