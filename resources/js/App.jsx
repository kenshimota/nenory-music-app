import React from "react";
import ReactDOM from "react-dom/client";

import Button from "./components/Button";
import Example from "./components/Example";

const App = () => (
    <>
       <Example />
       <Button />
    </>
);

if (!globalThis.process || process.env.NODE_ENV !== "test") {
    window.addEventListener("load", () => {
        console.log("execute");
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
