import { RouteObject } from "react-router-dom";
import { URLS } from "@shared/helpers/urls";
import ProtectedRoute from "./ProtectedRoute";
import ReversedRoute from "./ReversedRoute";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/signup/Signup";
import ResetPassword from "../pages/auth/resetPassword/ResetPassword";
import Home from "@pages/home/Home";

export const Routes: RouteObject[] = [
	{
		path: URLS.login,
		element: (
			<ReversedRoute>
				<Login />
			</ReversedRoute>
		),
	},
	{
		path: URLS.signup,
		element: (
			<ReversedRoute>
				<Signup />
			</ReversedRoute>
		),
	},
	{
		path: URLS.resetPassowrd,
		element: (
			<ReversedRoute>
				<ResetPassword />
			</ReversedRoute>
		),
	},
	{
		path: URLS.home,
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
];
