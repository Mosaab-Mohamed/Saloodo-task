import { createContext, useState, useEffect } from "react";
import type { User } from "@shared/types/user";
import user from "@shared/classes/user";
import { Loader } from "@components/Loader";

type AppContextValues = {
	userData: User | undefined;
};
export const AppContext = createContext<AppContextValues>({
	userData: undefined,
});

export default function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [userData, setUserData] = useState<User>();
	const [isLoading, setIsLoaing] = useState(false);

	useEffect(() => {
		(async function () {
			setIsLoaing(() => true);
			setUserData(await user.getCurrentUser());
			setIsLoaing(() => false);
		})();
	}, []);

	if (isLoading || !userData) return <Loader />;
	return (
		<AppContext.Provider value={{ userData }}>{children}</AppContext.Provider>
	);
}
