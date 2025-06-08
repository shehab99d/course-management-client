import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home";
import Login from "../Layout/Login/Login";
import Register from "../Layout/Register/Register";
import Course from "../Layout/Course/Course";
import AddCourse from "../Layout/AddCourse/AddCourse";
import Jobs from "../Layout/Jobs/Jobs";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ErrorPage from "../ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'courses',
                element: <PrivateRoute>
                    <Course></Course>
                </PrivateRoute>
            },
            {
                path: 'add-course',
                element: <PrivateRoute>
                    <AddCourse></AddCourse>
                </PrivateRoute>
            },
            {
                path: 'jobs',
                element: <Jobs></Jobs>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router