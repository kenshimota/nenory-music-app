import React from "react";
import ReactDOM from "react-dom/client";

import Button from "./components/Button";
import Example from "./components/Example";
import Typography from "./components/Typography" 

const App = () => (
    <>
       <Example />

       <Typography variant = "title1">
         TITULO 1
       </Typography>



       <Typography variant = "title2">
         TITULO 2
       </Typography>

       <Typography variant = "title3">
         TITULO 3
       </Typography>

       <Typography variant = "title4">
         TITULO 4
       </Typography>

       <Typography variant = "title5">
         TITULO 5
       </Typography>

       <Typography variant = "title5">
         TITULO 5
       </Typography>

       <Typography variant = "subtitle">
         Titulo del cuerpo del texto
       </Typography>


       <Typography variant = "body1">
       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
       </Typography>

       




       <Button size = "small">
        Juan
        </Button>
       

        <Button size = "small" variant ="dark">
        Botton
        </Button>

        <Button size = "small" variant ="outlined">
        Botton
        </Button>


        <Button size = "large" disabled onClick ={console.log}>
        Botton
        </Button>



        <Button>
        Botton
        </Button>
       <Button size = "large">
        Botton
        </Button>

        <Button size = "large" variant ="dark">
        Botton
        </Button>

        <Button size = "large" variant ="outlined">
        Botton
        </Button>
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
