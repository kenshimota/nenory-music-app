import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";
import RouterUser from "../components/RouteUser";
import LoginScreen from "../screens/LoginScreen/index";
import RouterWithoutSession from "../components/RouteWithoutSession";

const routerUser = [
    {
        path: "/",
        element: <HomeScreen />,
    },
]
    .map((route) => ({
        ...route,
        Component: RouterUser(() => route.element),
    }))
    .map(({ Component, ...route }) => ({
        ...route,
        element: <Component />,
    }));

const routerPublic = [
    {
        path: "/login",
        element: <LoginScreen />,
    },
]
    .map((route) => ({
        ...route,
        Component: RouterWithoutSession(() => route.element),
    }))
    .map(({ Component, ...route }) => ({
        ...route,
        element: <Component />,
    }));

const router = createBrowserRouter([...routerPublic, ...routerUser]);

export default router;
