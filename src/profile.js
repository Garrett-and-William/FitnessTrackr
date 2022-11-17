import React from "react"
import {Link} from "react-router-dom"

const Profile = () => {
    async function getMyRoutines(){
        const request = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/albert/routines', {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    }


    return (
                    <Link to = "/" className = "NavTextOne">There has been an Profile click here to go home</Link>

    )
}

export default Profile