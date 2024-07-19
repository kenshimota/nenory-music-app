import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";
import UsersScreen from "../screens/UsersScreen";
import RouterUser from "../components/RouteUser";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen/index";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import RouterWithoutSession from "../components/RouteWithoutSession";
import SuppliersScreen from "../screens/SuppliersScreen";
import ProductsScreen from "../screens/ProductsScreen";

const routerUser = [
    {
        path: "/",
        element: <HomeScreen />,
    },
    {
        path: "/users",
        element: <UsersScreen />,
    },
    {
        path: "/suppliers",
        element: <SuppliersScreen />,
    },
    {
        path: "/products",
        element: <ProductsScreen />,
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
        path: "/forget-password",
        element: <ForgetPasswordScreen />,
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
