import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"

const Register = () => {
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const navigate = useNavigate()
        
        async function logInApi (event) {
            event.preventDefault()
            // console.log('register started')
            // console.log(username, password) 

            try{
                const data = await fetch('https://garrettwilliamfitness.onrender.com/api/users/register', 
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : "application/json"
                    }, body: JSON.stringify({
                        username,
                        password
                      })
                    
                })
                const results = await data.json()
                // console.log(results)
                if (results.user.id) {
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
         setPassword(event.target.value)
         }
        function changeUser (event) {
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
                   <button type = "submit">Register</button>
                </div>
            </form>
          </div>
     
         ) 
}

export default Register