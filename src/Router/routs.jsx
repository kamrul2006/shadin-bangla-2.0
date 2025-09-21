import { createBrowserRouter } from "react-router";
import RootLayots from "../Layouts/RootLayots";
import HomePageLayOut from "../Layouts/HomePageLayOut";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayots />,
        children: [
            {
                path: '/',
                element: <HomePageLayOut />
            }
        ]
    },
]);