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
import CourseManage from "../Layout/CourseManage/CourseManage";
import Edit from "../Layout/Edit/Edit";

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
                loader: () => fetch('http://localhost:5000/courses'),
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
            },
            {
                path: 'manage-courses',
                element: <PrivateRoute>
                    <CourseManage></CourseManage>
                </PrivateRoute>
            },
            {
                path: 'edit-course/:id',
                element: <PrivateRoute>
                    <Edit></Edit>
                </PrivateRoute>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router