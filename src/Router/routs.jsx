import { createBrowserRouter } from "react-router";
import RootLayots from "../Layouts/RootLayots";
import HomePageLayOut from "../Layouts/HomePageLayOut";
import ErrorPage from "../Components/Fixed/ErrorPage";
import BlogPageLayOut from "../Layouts/BlogPageLayOut";
import SohidPageLayOut from "../Layouts/SohidPageLayOut";
import JulyGalleryLayouts from "../Layouts/JulyGalleryLayouts";
import Contact from "../Components/Fixed/Contact";
import WriteBlog from "../Components/Other/Blogs/WriteBlog";


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
                path: '/writeBlog',
                element: <WriteBlog />
            },
            {
                path: '/contact',
                element: <Contact />
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