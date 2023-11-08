import React , { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        reEnterPassword:""
    })

    const handleChnage = (e)=>{
        const {name,value}=e.target
        // console.log(name,value);
        setUser({
            ...user,
            [name]:value
        })
    }

    const register=()=>{
        const {name , email, password ,reEnterPassword} = user
        if(name && email && password &&(password === reEnterPassword)){
            axios.post("http://localhost:9002/register",user)
            // .then(res=>console.log(res))
            .then(res => {
                alert(res.data.message)
                navigate("/login")
            })
        }
        else{
            alert("invaild")
        }
    }

    return (
        <div className="register">
            {/* {console.log("User",user)} */}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Name" onChange={ handleChnage }></input>
            <input type="text"  name="email" value={user.email} placeholder="Email" onChange={ handleChnage }></input>
            <input type="password" name="password" value={user.password} placeholder="password" onChange={ handleChnage }></input>
            <input type="password"  name="reEnterPassword" value={user.reEnterPassword} placeholder="ReEnter password" onChange={ handleChnage }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={ ()=>navigate("/login") }>Login</div>
        </div>
    )
}

export default Register