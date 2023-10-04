import { Link } from "react-router-dom";
import { Box, Text, Card, Title } from "@mantine/core";
import { URLS } from "@shared/helpers/urls";
import Form from "./Form";
import saloodo from "@shared/assets/saloodoLogo.jpg";
import classes from "./style.module.scss";

export default function Signup() {
	return (
		<Box className={classes.signup}>
			<Card shadow="md" radius="md" p="lg">
				<img
					src={saloodo}
					alt="saloodo logo"
					style={{ width: "100px", padding: "20px 0" }}
				/>
				<Title order={3} mb="lg" ta="center">
					Create a new account
				</Title>
				<Text size="sm" ta="center" mb="lg">
					Have an account?
					<Link to={URLS.login} color="blue">
						<Text span c="blue" ml={5}>
							Login
						</Text>
					</Link>
				</Text>

				<Form />
			</Card>
		</Box>
	);
}
