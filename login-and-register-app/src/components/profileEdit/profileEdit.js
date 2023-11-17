import React ,{useState} from "react";
import axios from 'axios'
import "../register/edit.css"
import { useNavigate } from "react-router-dom";

const Profile = ( {setLoginUser} )=>{
    const navigate = useNavigate()

    const [Updateduser,setUser]=useState({
        name:"",
        email:"",
        newPassword:"",
        currentPassword:""
    });
    // const [image, setImage] = useState({})

    const handlechange = (e) =>{
        const {name,value}=e.target
        // console.log(name,value)
        setUser({
            ...Updateduser,
            [name]:value
        })
    }
    
    const profile = () => {
        const { email ,name, newPassword, currentPassword } = Updateduser;
        // const user_ID = ;
        if (email && name && newPassword && currentPassword) {
            axios.put("http://localhost:9002/profile", Updateduser)
                .then(res => {
                    console.log(res.data);
                    alert("Profile updated successfully");
                    navigate("/");
                })
                .catch(error => {
                    console.error(error);
                    alert("Error updating profile");
                });
        } else {
            alert("Invalid input. Name, current password, and new password are required.");
        }
    };
    
    const delAccount = () => {
        const delEmail = prompt("Enter Email");
        const delPassword = prompt("Enter Password");
    
        if (delEmail && delPassword) {
            axios.delete("http://localhost:9002/deleteAccount", {
                data: { email: delEmail, password: delPassword }
            })
            .then(res => {
                alert(res.data.message);
                // Optionally, update your state or perform other actions
                navigate("/login");
            })
            .catch(error => {
                console.error(error);
                // Handle error appropriately
            });
        } else {
            alert("Invalid input. Both email and password are required.");
        }
    };

        // const onImageChange = (event) => {
        //  if (event.target.files && event.target.files[0]) {
        //    setImage(URL.createObjectURL(event.target.files[0]));
        //  }
        // }

    return(
        <div className="profile">
            <h1>Hello Edit Page</h1>
            {/* <img src="https://reactjs.org/logo-og.png" alt="React Image" />  */}
            {/* <img alt="preview image" src={image}/>
            <input type="file" onChange={onImageChange} className="filetype" /> */}
            <img src="https://th.bing.com/th/id/OIP.w-_6bSw_8lvy3p2pCGeQPAAAAA?pid=ImgDet&rs=1" alt="Profile pic"></img>
            <input type="text"  name="email"  placeholder="Email" onChange={ handlechange }></input>
            <input type="text" name="name"  placeholder="Name" onChange={handlechange} ></input>
            <input type="password"  name="currentPassword"  placeholder="Current password" onChange={handlechange} ></input>
            <input type="password"  name="newPassword"  placeholder="New password" onChange={handlechange} ></input>
            <div className="button" onClick={profile}>Edit</div>
            <div className="button" onClick={()=>{navigate("/")}}>Home</div>
            <div className="button" onClick={ delAccount }>Delete Account</div>
        </div>

    )
}
export default Profile