import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"


const WorkoutActivityAll = () => {
    const [info, setInfo] = useState([])
    useEffect(()=>{
        try{
            async function getActivity(){
                const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                const data = await response.json()
                console.log(data)
                setInfo(data)
            } 
            getActivity()  
        }catch(error){
            console.log()
        }
        
    },[])
  
    return (
        <div  className = "LowerValue">
            {info && info.length ? info.map((el)=> {return <div className = "WorkoutContainer" key = {el.id}>
                
                <div className = "WorkoutTitle">{el.name}</div>
                <div className = "WorkoutDescription">{el.description}</div>
                <Link to = "/">All Routines Related to {el.name}</Link>
                
            </div>}): "sorry internet connection not valid"}
        </div>
    )

}

export default WorkoutActivityAll