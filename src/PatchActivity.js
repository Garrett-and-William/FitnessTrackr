import {useState, useEffect} from "react"
import {Link, useNavigate, useParams } from "react-router"
// import {} from 'react-router-dom'


const ActivityPatch = () => {
    const [workoutName, setWorkoutName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const [isTrue, setIsTrue] = useState(true)
    const {activityId} = useParams();

    async function patchWorkout(event){
        
        event.preventDefault()
        
        // console.log(activityId)
        try {
            const request = await fetch(`http://localhost:1337/api/activities/${activityId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                  name: workoutName,
                  description: description
                })
              })
            const response = await request.json();
            // console.log(response)
            
            if(response.id){
                navigate("../WorkoutActivityAll")
                alert('Activity Changed')
            }
            
        } catch (error) {
            console.log(error)
            // alert(error)
        }
        
    }


    async function changeName(event){
        setWorkoutName(event.target.value)
        // console.log(workoutName)
    }
    async function changeDescription(event){
        setDescription(event.target.value)
        // console.log(description)
    }
    async function changeIsTrue(event){
        setIsTrue(event.target.value)
        // console.log(isTrue)
        
    }

    return(
        <div className = "container">
            <form onSubmit = {patchWorkout}>
                <div className = "TypingInput">
                    <div Style = "display: flex;text-align: left">Edit Activity Name: <input type = "text" value = {workoutName} onChange = {changeName}></input></div>
                    
                </div>
                <div className = "TypingInput">
                    <div>Edit Description</div>
                    <textarea Style = "width: 100%; height: 10vh; padding: 10px; text-align: top-left: start;" type = "text" value = {description} onChange = {changeDescription}></textarea>
                </div>
                <div className = "submitcontain">
                   <button type = "submit">Edit Workout</button>
                </div>
            </form>
        </div>
    )

}

export default ActivityPatch