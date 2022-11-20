import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
// import {} from "react-router"

const ActivityByRoutine = () => {
    const [info, setInfo] = useState([])
    const { activityId } = useParams()
    // console.log(activityId)
    useEffect(()=>{
        // console.log('made it to front end')
        
        try{
            async function getRoutineByActivity(){
                const response = await fetch(`https://garrettwilliamfitness.onrender.com/api/activities/${activityId}/routines`, {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  })
                const data = await response.json()
                // console.log(' this is the all data', data)
                setInfo(data)
            } 
            getRoutineByActivity()  
        }catch(error){
            console.log(error)
        }
        
    },[])
//   console.log('this is the info', info)
//   console.log('this is the length', info.length)
    return (
        <div  className = "LowerValue">
            {info && info.length ? info.map((el)=> {return <div className = "WorkoutContainer" key = {el.id}>
            
                <div className = "WorkoutTitle">{el.name}</div>
                <div className = "WorkoutDescription">{el.goal}</div>
                <Link to = {`/WorkoutActivityAll/${el.id}`}> Edit Activity</Link>
                
            </div>}): "This Activity is not attached to any Public Routines"}
        </div>
    )

}

export default ActivityByRoutine