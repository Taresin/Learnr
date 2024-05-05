import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Scaffold from "./Scaffold";
import Mine from "./Mine";
import Home from "./Home";
import Home2 from "./Home2";
import RunGameScreen1 from "./RunGameScreen1";
import RunGameScreen2 from "./RunGameScreen2";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/2",
        element: <Home2 />,
    },
    {
        path: "mine1",
        element: (
            <Scaffold>
                <RunGameScreen1 />
            </Scaffold>
        ),
    },
    {
        path: "mine2",
        element: (
            <Scaffold>
                <RunGameScreen2 />
            </Scaffold>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
