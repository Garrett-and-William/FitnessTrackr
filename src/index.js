import React from "react"
import ReactDOM from "react-dom"
import {createRoot} from "react-dom/client"
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import NavBar from "./Navbar"
import Error from "./Error"
import Homepage from "./Homepage"
import Workouts from "./Workouts"
import Login from "./Login"
import Register from "./Register"
import Profile from "./profile"
import "./styles.css"
import WorkoutPost from "./WorkoutPost"
import ActivityPost from "./postActivity"
import WorkoutActivityAll from "./WorkoutActivity"

const app = document.getElementById("app")

// console.log(app)
const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Homepage/>
            },
            {
                path: "/Login",
                element: <Login/>
            },
            {
                path: "/Register",
                element: <Register/>
            },
            {
                path: "/Workouts",
                element: <Workouts/>
            },
            {
                path: "/Profile",
                element: <Profile/>
            },
            {
                path: "/WorkoutPost",
                element: <WorkoutPost/>
            },
            {
                path: "/ActivityPost",
                element: <ActivityPost/>
            },
            {
                path: "/WorkoutActivityAll",
                element: <WorkoutActivityAll/>
            }
        ]
        
    }
    
])




let root = createRoot(app)
root.render(<RouterProvider router = {router}/>)