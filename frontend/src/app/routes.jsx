import {createBrowserRouter, Navigate} from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import CreatePage from "../pages/CreatePage/CreatePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "create",
				element: <CreatePage />,
			},
			// {
			// 	path: "*", // Обработка несуществующих маршрутов
			// 	element: <Navigate to='home' replace />, // Перенаправление на главную
			// },
		],
	},
]);

export default router;
