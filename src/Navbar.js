import React from "react"
import {Link, Outlet} from "react-router-dom"

const NavBar = () => {
    return (
        <div>
            <div className = "NavBar">
                <div className = "Title"><Link to = "/" className= "Title">FitnessTracker</Link></div>
                <div className = "navbar">
                <div className = "FirstHalf">
                    <Link to = "/" className = "NavButton">Homepage</Link>
                    <Link to = "/Workouts" className = "NavButton">Workouts</Link>
                </div>
                <div className = "SecondHalf">
                    <Link to = "/Login" className = "NavButton">Login</Link>
                    <Link to = "/Register" className = "NavButton">Register</Link>
                    <Link to = "/Profile" className = "NavButton">Profile</Link>
                </div>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default NavBar