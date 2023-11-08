import React, { useState } from "react"
import "./login.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ( { setLoginUser } ) => {

    const navigate = useNavigate()

    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const handleChnage = (e)=>{
        const {name,value}=e.target
        // console.log(name,value);
        setUser({
            ...user,
            [name]:value
        })
    }

    const login=()=>{
        axios.post("http://localhost:9002/login",user)
        // .then(res => console.log(res))
        .then(res => {
            alert(res.data.message)
            setLoginUser(res.data.user)
            navigate("/")
        })
    }

    return (
        <div className="login">
            {/* {console.log(user)}; */}
            <h1>Login</h1>
            <input type="text" name="email" placeholder="Email" value={user.email} onChange = { handleChnage }></input>
            <input type="password" name="password" placeholder="password" value={user.password} onChange = { handleChnage }></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={ () => navigate("/register") }>Register</div>
        </div>
    )
}

export default Login