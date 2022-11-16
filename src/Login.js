import {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
    const navigate = useNavigate()

   async function logInApi (event) {
    event.preventDefault()
    try{
        const data = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', 
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
        console.log(results)
        if (results.success == true) {
            localStorage.setItem("token", results.token)
        } else {
            alert (results.message)
        }
        if (results.user.id){
            navigate("../")
        }
    } catch(error){
        console.log(error)
    }
    
   }
   
   function changePass (event) {
    console.log(password)
    setPassword(event.target.value)
    
    }
   function changeUser (event) {
    console.log(username)
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
                <input type = "text" value = {password} onChange={changePass}></input>
            </div>
            <div className = "submitcontain">
               <button type = "submit">Login</button>
            </div>
        </form>
      </div>
    )
}

export default Login