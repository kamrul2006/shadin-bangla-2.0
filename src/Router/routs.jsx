import { createBrowserRouter } from "react-router";
import RootLayots from "../Layouts/RootLayots";
import HomePageLayOut from "../Layouts/HomePageLayOut";
import ErrorPage from "../Components/Fixed/ErrorPage";
import BlogPageLayOut from "../Layouts/BlogPageLayOut";
import SohidPageLayOut from "../Layouts/SohidPageLayOut";
import JulyGalleryLayouts from "../Layouts/JulyGalleryLayouts";
import Contact from "../Components/Fixed/Contact";
import WriteBlog from "../Components/Other/Blogs/WriteBlog";
import BlogDetailsPage from "../Components/Other/Blogs/BlogDetailsPage";
import LoginPage from "../Auth/Users/Loginpage";
import SignupPage from "../Auth/Users/SignupPage";
import AdminPageLayOut from "../Layouts/AdminPageLayOut";
import ManageBlogs from "../Components/AdminPage/ManageBlogs";
import ManageReviews from "../Components/AdminPage/ManageReviews";


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
            // --------------blogs page------------------
            {
                path: '/blog',
                element: <BlogPageLayOut />
            },
            {
                path: "/blog/:id",
                element: <BlogDetailsPage />
            },
            {
                path: '/writeBlog',
                element: <WriteBlog />
            },

            // --------------contact------------------
            {
                path: '/contact',
                element: <Contact />
            },

            // -----------shohid page-------------
            {
                path: '/shohid',
                element: <SohidPageLayOut />
            },

            // -----------------------july gallery--------------
            {
                path: '/julyGallery',
                element: <JulyGalleryLayouts />
            },
        ]
    },
    // ---------------------authentication--------------
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <SignupPage />
    },
    {
        path: "/manage",
        element: <AdminPageLayOut />,
        children: [
            {
                path: '/manage',
                element: <ManageBlogs />
            },
            {
                path: '/manage/manageBlogs',
                element: <ManageBlogs />
            },
            {
                path: '/manage/manageReviews',
                element: <ManageReviews />
            },
        ]
    }
]);