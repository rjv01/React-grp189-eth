const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

// mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("DB connected")
// })

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost:27017/myLoginRegisterDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('DB connected');
    } catch (error) {
      console.error('DB connection failed:', error);
    }
  }
  
connectToDatabase();

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const User = new mongoose.model("User",userSchema);

//Routes

/*app.post("/login",(req,res)=>{
   const {email,password} = req.body;
   User.findOne({email:email},(err,user) => {
    if(user){
        if(password === user.password){
            res.send({message:"Login Successfull", user:user})
        }
        else{
            res.send({message:"Password Incorrect"})
        }
    }
    else{
        res.send({message:"User not registered"});
    }
   })
});*/

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (user) {
        if (password === user.password) {
          res.json({ message: 'Login Successful', user });
        } else {
          res.json({ message: 'Password Incorrect' });
        }
      } else {
        res.json({ message: 'User not registered' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' });
    }
  });


/*app.post("/register",(req,res)=>{
    // console.log(req.body);
    const {name,email,password} = req.body

    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User already register"})
        }
        else{
            const user = new User({
                name,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.send({message:"Successfully Registered"})
                }
            })  
        }
    })
})*/

app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        res.json({ message: 'User already registered' });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
  
        await newUser.save();
        res.json({ message: 'Successfully Registered' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during registration' });
    }
  });

app.listen(9002,()=>{
    console.log("Server is running on port 9002");
});

/* import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 

app.listen(9002,() => {
    console.log("BE started at port 9002")
})*/