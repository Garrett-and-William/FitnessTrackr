import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"


const WorkoutActivityPost = () => {
    try{
        async function getActivity (){
            fetch('http://fitnesstrac-kr.herokuapp.com/api/activities/', {
                method: "PATCH",
                body: JSON.stringify({
                        name: 'Running',
                        description: 'Keep on running, til you drop!'
                })
            })
        }   
    }catch(error){

    }
  
    

    return (
        <div>
            WorkoutPost
        </div>
    )

}