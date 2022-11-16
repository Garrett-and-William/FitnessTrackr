import React from "react"
import {Link} from "react-router-dom"

const Homepage = () => {
    
    async function isUserLoggedIn() {
        try{
            const data = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', 
            {
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const results = await data.json()
            console.log(results)
        } catch(error){
            console.log(error)
        }
        
       }

    return (
        <div className = "container" >
                    <img Style = "border: 20px gold solid; border-radius: 80px 180px 80px 180px;box-shadow: 5px 3px 10px black;margin-right: 10px;" src = "https://media.tenor.com/ZmRsJJ8OGKAAAAAC/roids-roid.gif"/>
                    <img Style = "border: 20px gold solid; border-radius: 180px 80px 180px 80px;box-shadow: 5px 3px 10px black;margin-left: 10px;" src = "https://media.tenor.com/ZmRsJJ8OGKAAAAAC/roids-roid.gif"/>
        </div>

    )
}

export default Homepage