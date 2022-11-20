import React, {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

const Profile = () => {

    const [user, setUser] = useState()
    const [info, setInfo] = useState()
    const navigate = useNavigate()
    

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

async function getMyRoutines(){
    console.log('profile user', user)
    if(user != undefined){
        try{
            const request = await fetch(`http://localhost:1337/api/users/${user}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                },
        })
            // console.log(await request.json())
            const response = await request.json()
            console.log(response)
            setInfo(response)
            } catch(error){
        console.log(error)

    }
    }   
}

useEffect(() => { 
getMyRoutines()
},[user])

async function deleteFrom (id){
    console.log(id)
    try {
        const req = await fetch(`http://localhost:1337/api/routines/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
        const deleted = await req.json()
        getMyRoutines()
    } catch (error) {
        console.log(error)
    }
}




    return (
        <div  className = "LowerValue">
        {info && info.length ? info.map((el)=> {return <div className = "WorkoutContainer" key = {el.id}>
            
            <div className = "WorkoutTitle">{el.name}</div>
            <div className = "WorkoutDescription">{el.goal}</div>
            <div className = "WorkoutDescription">{el.isPublic === true ? "Public" : "Private"}</div>
            <button onClick = {()=> {deleteFrom(el.id)}}>Delete</button>
        </div>}): "sorry internet connection not valid"}
    </div>

    )
}

export default Profile