import Root from "@/layout/Root";
import Contact from "@/pages/Contact/Contact";
import Auth from "@/pages/Auth/Auth";
import Apps from "@/pages/Dashboard/Apps/Apps";
import Calender from "@/pages/Dashboard/Calender/Calender";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardHome from "@/pages/Dashboard/DashboardHome/DashboardHome";
import Settings from "@/pages/Dashboard/Settings/Settings";
import ErrorPage from "@/pages/Error/ErrorPage";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import About from "@/pages/About/About";
import Channel from "@/pages/Dashboard/Channel/Channel";
import Post from "@/pages/Dashboard/Post/Post";
import { Terminal } from "@/pages/Dashboard/Apps/components/Terminal";
import { Calculator } from "@/pages/Dashboard/Apps/components/Calculator";
import Whiteboard from '@/pages/Dashboard/Apps/components/Whiteboard';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "auth",
                element: <Auth />
            },
            {
                path: "contact",
                element: <Contact />
            },

            {
                path: 'about',
                element: <About />
            },
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





    // dashboard route
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "",
                element: <DashboardHome />
            },
            {
                path: "ch/:channelCode",
                element: <Channel />
            },
            {
                path: "ch/:channelCode/:firstLetter/:postCode",
                element: <Post />
            },
            {
                path: "calendar",
                element: <Calender />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "apps",
                children: [
                    {
                        path: "",
                        element: <Apps />
                    },
                    {
                        path: "terminal",
                        element: <Terminal />
                    },
                    {
                        path: "calculator",
                        element: <Calculator />
                    },
                    {
                        path: "whiteboard",
                        element: <Whiteboard />
                    }
                ]
            }
        ]
    }
])

export default router;