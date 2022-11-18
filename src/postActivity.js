import {useState, useEffect} from "react"
import {Link, useNavigate } from "react-router"

const ActivityPost = () => {
    const [workoutName, setWorkoutName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const [isTrue, setIsTrue] = useState(true)
    async function postWorkout(event){
        event.preventDefault()
        try {
            const request = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                },body: JSON.stringify({
                  name: workoutName,
                  description: description
                })
              })
            const response = await request.json()
            console.log(response)
            if(response.id){
                navigate("../WorkoutActivityAll")
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }


    async function changeName(event){
        setWorkoutName(event.target.value)
        console.log(workoutName)
    }
    async function changeDescription(event){
        setDescription(event.target.value)
        console.log(description)
    }
    async function changeIsTrue(event){
        setIsTrue(event.target.value)
        console.log(isTrue)
        
    }

    return(
        <div className = "container">
            <form onSubmit = {postWorkout}>
                <div className = "TypingInput">
                    <div Style = "display: flex;text-align: left">Activity Name: <input type = "text" value = {workoutName} onChange = {changeName}></input></div>
                    
                </div>
                <div className = "TypingInput">
                    <div>Description</div>
                    <textarea Style = "width: 100%; height: 10vh; padding: 10px; text-align: top-left: start;" type = "text" value = {description} onChange = {changeDescription}></textarea>
                </div>
                <div className = "submitcontain">
                   <button type = "submit">Post Workout</button>
                </div>
            </form>
        </div>
    )

}

export default ActivityPost