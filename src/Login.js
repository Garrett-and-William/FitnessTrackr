import {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
    const navigate = useNavigate()

   async function logInApi (event) {
    event.preventDefault()
    try{
        //http://fitnesstrac-kr.herokuapp.com
        //http://localhost:1337
        const data = await fetch('https://garrettwilliamfitness.onrender.com/api/users/login', 
        {
            method : "POST",
            headers : {
                'Content-Type' : "application/json"
            },body: JSON.stringify({
                username,
                password
              })
            
        })
        const results = await data.json()
        // console.log(results)
        if (results.token) {
            localStorage.setItem("token", results.token)
        } else {
            alert (results.message)
        }
        if (results.token){
            navigate("../")
            alert(results.message)
        }
    } catch(error){
        console.log(error)
    }
    
   }
   
   function changePass (event) {
    // console.log(password)
    setPassword(event.target.value)
    
    }
   function changeUser (event) {
    // console.log(username)
    setUsername(event.target.value)
    
    }
    return (
        <div className = "container">
        <form onSubmit={logInApi}>
            <div className = "TypingInput">
                <div>Input New Username </div>
                <input type = "text" value = {username} onChange={changeUser}></input>
            </div>
            <div className = "TypingInput">
                <div>Input New Password </div>
                <input type = "password" value = {password} onChange={changePass}></input>
            </div>
            <div className = "submitcontain">
               <button type = "submit">Login</button>
            </div>
        </form>
      </div>
    )
}

export default Login