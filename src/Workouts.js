import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Workouts = () => {
    const [workouts, setWorkouts] = useState()
    useEffect(()=> {
    async function getAllWorkouts () {
        try{
            const data = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', 
            {
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            const results = await data.json()
            setWorkouts(results)
            console.log(results)
        } catch(error){
            console.log(error)
        }
        
       }
       getAllWorkouts()
        }
    
    ,[])

 

    return (
            <div className = "LowerValue">
                {workouts && workouts.length ? workouts.map(el => {
                return  <div className = "WorkoutContainer" key = {el.id}> 
                        <div className = "WorkoutTitle">{el.name}</div> 
                        <div className = "WorkoutDescription">{el.goal}</div> 
                        <div className = "WorkoutDescription">By: {el.creatorName}</div> 
                        <div>Activities</div>
                        <div className = "activitiesContainer">
                        
                        {el.activities && el.activities.length ? el.activities.map((ele) => {return <div className = "WorkoutActivities">[ {ele.name} ]</div>}): "cheese"}
                        </div>
                        </div>}) : "Internet Connection Not Valid"}
                        
            </div>

    )
}

export default Workouts