import React from "react"
import {Link, Outlet,useNavigate} from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()
    async function logout(){
        localStorage.removeItem("token")
        navigate("/")
    }



    return (
        <div>
            <div className = "NavBar">
                <div className = "Title"><Link to = "/" className= "Title">FitnessTracker</Link></div>
                <div className = "navbar">
                    <div className = "FirstHalf">
                        <Link to = "/" className = "NavButton">Homepage</Link>
                        <Link to = "/Workouts" className = "NavButton">Workouts</Link>
                        <Link to = "/WorkoutActivityAll" className = "NavButton">All Activities</Link>
                    </div>
                    <div className = "SecondHalf">
                        {localStorage.getItem("token") ? <div className = "SecondHalf"><Link to = "/WorkoutPost" className = "NavButton">Post Workout</Link>
                        <Link to = "/ActivityPost" className = "NavButton">Post Activity</Link>
                        <Link to = "/Profile" className = "NavButton">Profile</Link>
                        <a className = "NavButton" onClick={()=> {logout()}}>Logout</a>
                        </div>: <div className = "SecondHalf"> 
                        <Link to = "/Register" className = "NavButton">Register</Link>
                        <Link to = "/Login" className = "NavButton">Login</Link>
                        </div>}
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default NavBar