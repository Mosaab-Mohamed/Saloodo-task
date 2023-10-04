import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { URLS } from "@shared/helpers/urls";
import { Loader } from "@components/Loader";
import useAuthState from "./useAuthState";

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const { isLoggedIn, isChecking } = useAuthState();

	if (isChecking) return <Loader />;
	return isLoggedIn ? <>{children}</> : <Navigate to={URLS.login} />;
}
