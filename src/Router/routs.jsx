import { createBrowserRouter } from "react-router";
import RootLayots from "../Layouts/RootLayots";
import HomePageLayOut from "../Layouts/HomePageLayOut";
import ErrorPage from "../Components/Fixed/ErrorPage";
import BlogPageLayOut from "../Layouts/BlogPageLayOut";
import HistoryPageLayOuts from "../Layouts/HistoryPageLayOuts";
import SohidPageLayOut from "../Layouts/SohidPageLayOut";
import JulyGalleryLayouts from "../Layouts/JulyGalleryLayouts";
import Contact from "../Components/Fixed/Contact";


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
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/history',
                element: <HistoryPageLayOuts />
            },

            {
                path: '/shohid',
                element: <SohidPageLayOut />
            },
            {
                path: '/julyGallery',
                element: <JulyGalleryLayouts />
            },
        ]
    }]);