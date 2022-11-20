import {useState, useEffect} from "react"
import {Link} from "react-router-dom"


const WorkoutActivityAll = () => {
    const [info, setInfo] = useState([])
    useEffect(()=>{
        // console.log('made it to front end')
        try{
            async function getActivity(){
                const response = await fetch('https://garrettwilliamfitness.onrender.com/api/activities', {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                  })
                const data = await response.json()
                // console.log(' this is the all activities', data)
                setInfo(data)
            } 
            getActivity()  
        }catch(error){
            console.log(error)
        }
        
    },[])
  
    return (
        <div  className = "LowerValue">
            {info && info.length ? info.map((el)=> {return <div className = "WorkoutContainer" key = {el.id}>
                
                <div className = "WorkoutTitle">{el.name}</div>
                <div className = "WorkoutDescription">{el.description}</div>
                <Link to = {`/WorkoutActivityAll/${el.id}/routines`}>All Routines Related to {el.name}</Link>
                <Link to = {`/WorkoutActivityAll/${el.id}`}> Edit Activity</Link>
                
            </div>}): "sorry internet connection not valid"}
        </div>
    )

}

export default WorkoutActivityAll