import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import router from "./routes";
import useTheme from "./theme";
import Auth from "./components/Auth";

const App = () => {
    const theme = useTheme();

    return (
        <Auth>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Auth>
    );
};

if (!globalThis.process || process.env.NODE_ENV !== "test") {
    window.addEventListener("load", () => {
        const dom = document.querySelector("#react-root");

        if (!dom) {
            return;
        }

        const Root = ReactDOM.createRoot(dom);
        Root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    });
}

export default App;
