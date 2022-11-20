import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Profile = () => {

    const [user, setUser] = useState()
    const [info, setInfo] = useState()
    
    

useEffect(() => {
    async function isUserLoggedIn() {
        console.log(`${localStorage.getItem("token")}`)
        try{
            const data = await fetch('http://localhost:1337/api/users/me', 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log('here')
            const results = await data.json()
            console.log('is user logged in', results)
            setUser(results.username)
            

        } catch(error){
            console.log(error)
        }
        
       }
    
    isUserLoggedIn()
},[])

useEffect(() => { 
async function getMyRoutines(){
    console.log('profile user', user)
    if(user != undefined){
        try{
            const request = await fetch(`http://localhost:1337/api/users/${user}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                },
        })
            const response = await request.json()
            setInfo(response)
            } catch(error){
        console.log(error)

    }
    }   
}
getMyRoutines()
},[user])




    return (
                    <Link to = "/" className = "NavTextOne">{user}{info}There has been an Profile click here to go home</Link>

    )
}

export default Profile