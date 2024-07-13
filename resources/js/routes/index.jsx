import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";
import UsersScreen from "../screens/UsersScreen";
import RouterUser from "../components/RouteUser";
import LoginScreen from "../screens/LoginScreen/index";
import RouterWithoutSession from "../components/RouteWithoutSession";
import SignUpScreen from "../screens/SignUpScreen";
import { element } from "prop-types";

const routerUser = [
    {
        path: "/",
        element: <HomeScreen />,
    },
    {
        path: "/users",
        element: <UsersScreen />,
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
    {
        path: "/signup",
        element: <SignUpScreen />,
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
