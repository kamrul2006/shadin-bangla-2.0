import { createBrowserRouter } from "react-router";
import RootLayots from "../Layouts/RootLayots";
import HomePageLayOut from "../Layouts/HomePageLayOut";
import ErrorPage from "../Components/Fixed/ErrorPage";
import BlogPageLayOut from "../Layouts/BlogPageLayOut";
import HistoryPageLayOuts from "../Layouts/HistoryPageLayOuts";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayots />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePageLayOut />
            },
            {
                path: '/blog',
                element: <BlogPageLayOut />
            },
            {
                path: '/history',
                element: <HistoryPageLayOuts />
            },
        ]
    },
]);