import {useState, useEffect} from "react"
import {Link, useNavigate } from "react-router"

const WorkoutPost = () => {
    const [workoutName, setWorkoutName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const [isTrue, setIsTrue] = useState(true)
    async function postWorkout(event){
        event.preventDefault()
        try {
            const request = await fetch('http://localhost:1337/api/routines', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                },body: JSON.stringify({
                  name: workoutName,
                  goal: description,
                  isPublic: isTrue
                })
              })
            const response = (await request.json()).rows[0]
            console.log(response.id)
            if(response.id){
                console.log('here')
                navigate("../Workouts")
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
                    <div Style = "display: flex;text-align: left">Workout Name: <input type = "text" value = {workoutName} onChange = {changeName}></input></div>
                    
                </div>
                <div className = "TypingInput">
                    <div>Description</div>
                    <textarea Style = "width: 100%; height: 10vh; padding: 10px; text-align: top-left: start;" type = "text" value = {description} onChange = {changeDescription}></textarea>
                </div>
                <div className = "TypingInput">
                    <select onChange={changeIsTrue}>
                        <option value = {Boolean(true)}>Public</option>
                        <option value = {Boolean(false)}>Private</option>
                    </select>
                </div>
                <div className = "submitcontain">
                   <button type = "submit">Post Workout</button>
                </div>
            </form>
        </div>
    )

}

export default WorkoutPost