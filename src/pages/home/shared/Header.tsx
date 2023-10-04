import {
	Container,
	UnstyledButton,
	Group,
	Text,
	Menu,
	Box,
} from "@mantine/core";
import { IconLogout, IconSettings, IconChevronDown } from "@tabler/icons-react";
import { auth } from "@shared/firebase";
import user from "@shared/classes/user";
import saloodo from "@shared/assets/saloodoLogo.jpg";
import classes from "../style.module.scss";

export default function Header() {
	const { currentUser } = auth;

	return (
		<Box className={classes.header} mb="xl">
			<Container size="md">
				<Group justify="space-between">
					<img
						src={saloodo}
						alt="saloodo logo"
						style={{ width: "100px", padding: "20px 0" }}
					/>

					<Menu
						position="bottom-end"
						transitionProps={{ transition: "pop-top-right" }}
						withinPortal
					>
						<Menu.Target>
							<UnstyledButton>
								<Group gap={7}>
									<Text fw={500} size="sm" lh={1} mr={3}>
										{currentUser?.displayName}
									</Text>
									<IconChevronDown size={12} stroke={1.5} />
								</Group>
							</UnstyledButton>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item
								leftSection={<IconSettings size={20} stroke={1.5} />}
							>
								Account settings
							</Menu.Item>
							<Menu.Divider />
							<Menu.Item
								leftSection={<IconLogout size={20} stroke={1.5} />}
								onClick={() => user.signout()}
							>
								Logout
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Container>
		</Box>
	);
}
