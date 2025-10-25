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
import ManageUsers from "../Components/AdminPage/ManageUsers";
import ManageShohid from "../Components/AdminPage/ManageShohid";
import PrivetRout from "../Auth/Privet/Privetrought";
import CustomLoader from "../Components/Fixed/CustomLoader";


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
                path: '/loading',
                element: <CustomLoader />
            },
            {
                path: '/error',
                element: <ErrorPage />
            },
            // --------------blogs page------------------
            {
                path: '/blog',
                element: <BlogPageLayOut />
            },
            {
                path: "/blog/:id",
                element: <PrivetRout><BlogDetailsPage /></PrivetRout>
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
    // ------------------admin panel-----------------
    {
        path: "/manage",
        element: <PrivetRout><AdminPageLayOut /></PrivetRout>,
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
            {
                path: '/manage/manageUsers',
                element: <ManageUsers />
            },
            {
                path: '/manage/shohidInfo',
                element: <ManageShohid />
            },
        ]
    }
]);