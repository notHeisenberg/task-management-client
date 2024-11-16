import Root from "@/layout/Root";
import Contact from "@/pages/Contact/Contact";
import Auth from "@/pages/Auth/Auth";
import ErrorPage from "@/pages/Error/ErrorPage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "auth",
                element: <Auth />
            },
            {
                path: "contact",
                element: <Contact />
            }
        ]
    },
    // signin & signup
    {
        path: "login",
        element: <Login></Login>
    },
    {
        path: "signup",
        element: <SignUp></SignUp>
    },
]);

export default router;