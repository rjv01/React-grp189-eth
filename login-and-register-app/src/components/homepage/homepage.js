import React from "react"
import "./homepage.css"
import "../register/register.css"
import { useNavigate } from "react-router-dom"

const Homepage = ( {setLoginUser} ) => {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <h1>Hello Homepage</h1>
            <div className="button" onClick={ () =>setLoginUser({})}>Logout</div>
            <div className="button" onClick={ ()=>navigate("/profile")} >Profile</div>
            {/* <div className="button" onClick={() => setLoginUser({})} >Logout</div> */}
        </div>
    )
}

export default Homepage