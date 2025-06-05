import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>
            }
        ]
    }
])

export default router