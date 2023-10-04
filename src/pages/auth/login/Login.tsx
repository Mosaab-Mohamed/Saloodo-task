import { Link } from "react-router-dom";
import { Box, Text, Card, Title } from "@mantine/core";
import { URLS } from "@shared/helpers/urls";
import Form from "./Form";
import saloodo from "@shared/assets/saloodoLogo.jpg";
import classes from "./style.module.scss";

export default function Login() {
	return (
		<Box className={classes.login}>
			<Card shadow="md" radius="md" p="lg">
				<img
					src={saloodo}
					alt="saloodo logo"
					style={{ width: "100px", padding: "20px 0" }}
				/>
				<Title order={3} mb="lg" ta="center">
					Login to your account
				</Title>

				<Text size="sm" ta="center" mb="lg">
					Don't have an account?
					<Link to={URLS.signup} color="blue">
						<Text span c="blue" ml={5}>
							Create
						</Text>
					</Link>
				</Text>

				<Form />

				<Text size="sm">
					Forget password?
					<Link to={URLS.resetPassowrd}>
						<Text span c="blue" ml={5}>
							Reset
						</Text>
					</Link>
				</Text>
			</Card>
		</Box>
	);
}
