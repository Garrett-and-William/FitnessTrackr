import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Workouts = () => {
    const [workouts, setWorkouts] = useState()
    useEffect(()=> {

        async function getAllWorkouts () {
            try{
                const data = await fetch('http://localhost:1337/api/routines', 
                {
                    headers : {
                        'Content-Type': 'application/json'
                    }
                })
                const results = (await data.json()).publicRoutines
                setWorkouts(results)
                // console.log(results)
            } catch(error){
                console.log(error)
            }
    
           }
           getAllWorkouts()
            }
    
        ,[])

    return (
            <div className = "LowerValue">
                {/* {console.log(workouts.publicRoutines)} */}
                {workouts && workouts.length ? workouts.map(el => {
                return  <div className = "WorkoutContainer" key = {el.id}> 
                        <div className = "WorkoutTitle">{el.name}</div> 
                        <div className = "WorkoutDescription">{el.goal}</div> 
                        <div className = "WorkoutDescription">By: {el.creatorName}</div> 
                        <div>Activities:</div>
                        <div className = "activitiesContainer">
                        
                        {el.activities && el.activities.length ? el.activities.map((ele) => {return <div className = "WorkoutActivities"> {ele.name}: Duration -- {ele.count} Count-- {ele.count}
                        <Link to = {`/WorkoutActivityAll/${ele.id}/routines`}> View Activity</Link>
                        
                        </div>}): "No Activities attached to Routine"}
                        </div>
                        </div>}) : "Internet Connection Not Valid"}
                        
            </div>

    )
}

export default Workouts