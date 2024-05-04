import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Scaffold from "./Scaffold";
import Mine from "./Mine";
import Home from "./Home";
import RunGameScreen from "./RunGameScreen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "mine",
        element: (
            <Scaffold>
                <RunGameScreen />
            </Scaffold>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
