import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Profile = () => {
    const [user, setUser] = useState()
    const [info, setInfo] = useState()
    
    

useEffect(() => {
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
            setUser(results.username)
            

        } catch(error){
            console.log(error)
        }
        
       }
    
    isUserLoggedIn()
},[])

useEffect(() => { 
async function getMyRoutines(){
    if(user != undefined){
        try{
            const request = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${user}/routines`, {
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