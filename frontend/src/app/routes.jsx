import {createBrowserRouter, Navigate} from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import CreatePage from "../pages/CreatePage/CreatePage";
import MainPage from "../pages/MainPage/MainPage";
import AssPage from "../pages/AssPage/AssPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <MainPage />,
			},
			{
				path: "/create",
				element: <CreatePage />,
			},
			{
				path: "/:id",
				element: <AssPage />,
			},
			// {
			// 	path: "*", // Обработка несуществующих маршрутов
			// 	element: <Navigate to='home' replace />, // Перенаправление на главную
			// },
		],
	},
]);

export default router;
