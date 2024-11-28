import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import CreatePage from "../pages/CreatePage/CreatePage";
import MainPage from "../pages/MainPage/MainPage";
import AssPage from "../pages/AssPage/AssPage";
import PopupAssPage from "../pages/AssPage/PopupAssPage";
import PrivateRoute from "./reqRouter";
import LoginPage from "../pages/LoginPage/LoginPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: (
					<PrivateRoute>
						<MainPage />
					</PrivateRoute>
				),
			},
			{
				path: "/create",
				element: (
					<PrivateRoute>
						<CreatePage />
					</PrivateRoute>
				),
			},
			{
				path: "/registration",
				element: <LoginPage />,
			},
		],
	},
	{
		path: "/:id",
		element: (
			<PrivateRoute>
				<AssPage />
			</PrivateRoute>
		),
	},
	{
		path: "/popup/:id",
		element: (
			<PrivateRoute>
				<PopupAssPage />
			</PrivateRoute>
		),
	},
]);

export default router;
