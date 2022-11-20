import React, {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

const Profile = () => {
    const [activity, setActivity] = useState()
    const [user, setUser] = useState()
    const [info, setInfo] = useState()
    const [changeState, setChangeStat] = useState(false)
    const [changeStateId, setChangeStatId] = useState()
    const [activityValue, setActivityValue] = useState(1)
    const [setValue, setSetValue] = useState(1)
    const [repValue, setRepValue] = useState(1)
    const navigate = useNavigate()
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
                console.log(data)
                setActivity(data)
            } 
            getActivity()  
        }catch(error){
            console.log(error)
        }
        
    },[changeState])    

useEffect(() => {
    async function isUserLoggedIn() {
        // console.log(`${localStorage.getItem("token")}`)
        try{
            const data = await fetch('https://garrettwilliamfitness.onrender.com/api/users/me', 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log('here')
            const results = await data.json()
            // console.log('is user logged in', results)
            setUser(results.username)
            

        } catch(error){
            console.log(error)
        }
        
       }
    
    isUserLoggedIn()
},[])

async function getMyRoutines(){
    // console.log('profile user', user)
    if(user != undefined){
        try{
            const request = await fetch(`https://garrettwilliamfitness.onrender.com/api/users/${user}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                },
        })
            // console.log(await request.json())
            const response = await request.json()
            // console.log(response)
            setInfo(response)
            } catch(error){
        console.log(error)

    }
    }   
}

useEffect(() => { 
getMyRoutines()
},[user])



async function deleteFrom (id){
    // console.log(id)
    try {
        const req = await fetch(`https://garrettwilliamfitness.onrender.com/api/routines/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
        const deleted = await req.json()
        getMyRoutines()
    } catch (error) {
        console.log(error)
    }
}
async function changeId(id){
    if (changeState == true && id == changeStateId){
        setChangeStatId(null)
        setChangeStat(false)
    } else {
        setChangeStat(false)
        setChangeStatId(null)
        setChangeStat(true)
        setChangeStatId(id)
    }
    
}
async function attachActivity(event){
    event.preventDefault()
    try {
        const req = await fetch(`https://garrettwilliamfitness.onrender.com/api/routines/${changeStateId}/activities`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },body: JSON.stringify({
                activityId: {activityValue},
                count: {setValue}, 
                duration: {repValue}
                })
            })
            const attachActivity = await req.json()
            console.log(attachActivity)
        } catch (error) {
            console.log(error)
        }

}

async function changeSelectValue(event){
    setActivityValue(event.target.value)
    console.log(activityValue)
}
async function changeRepValue(event){
    setRepValue(event.target.value)
}
async function changeSetValue(event){
    setSetValue(event.target.value)
}



    return (
        <div  className = "LowerValue">
        {info && info.length ? info.map((el)=> {return <div className = "WorkoutContainer" key = {el.id}>
            
            <div className = "WorkoutTitle">{el.name}</div>
            <div className = "WorkoutDescription">{el.goal}</div>
            <div className = "WorkoutDescription">{el.isPublic === true ? "Public" : "Private"}</div>
            <button onClick = {()=> {changeId(el.id)}}>{console.log(changeStateId)}Add Activity to Routine</button>

            {changeState && changeState == true && changeStateId == el.id ? <div><form onSubmit={attachActivity}><select id = "changeMenu" onChange = {changeSelectValue}> 
                    {activity && activity.length ? activity.map((el)=> {return <option key = {el.id} value = {el.id}>{el.name}</option>}) : null}
            </select> 
            <div>Count:<input value = {setValue} onChange = {changeSetValue} type = "number"></input></div>
            <div>Duration: <input value = {repValue} onChange = {changeRepValue} type = "number"></input></div>
            <button type = "submit">Submit it</button>
            </form></div>: null}

            <button onClick = {()=> {deleteFrom(el.id)}}>Delete</button>
        </div>}): "sorry internet connection not valid"}
    </div>

    )
}

export default Profile