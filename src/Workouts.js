import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

const Workouts = () => {
    const [workouts, setWorkouts] = useState()
    async function GetAllWorkouts (event) {
        try{
            const data = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', 
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
       

       useEffect(GetAllWorkouts, 
        [])
    return (
            <div>
                {workouts && workouts.length ? workouts.map(el => {
                return  <div> 
                        <div>{el.id}</div> 
                        <div>{el.name}</div> 
                        <div>{el.description}</div> 
                        </div>}) : "cheese"}
            </div>

    )
}

export default Workouts