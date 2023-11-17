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

// app.get("/profile",(req,res)=>{
//   res.send("heloo");
// })

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

//   app.put('/profile/', async (req, res) => {
//     try {
//         console.log('Received profile update req:', req.body);
//         const { email ,name, currentPassword, newPassword } = req.body;

//         // Step 1: Find the User by Current email
//         const userWithCurrentemail = await User.findOne({ email });

//         if (userWithCurrentemail) {
//             // Step 2: Update the User
//             userWithCurrentemail.name = name;
//             if (newPassword) {
//               userWithCurrentemail.password = newPassword;
//             }

//             await userWithCurrentemail.save();
//             res.json({ message: 'Profile updated successfully', user: userWithCurrentemail });
//         } else {
//             res.status(404).json({ message: 'User not found or current password is incorrect' });
//         }
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ error: 'An error occurred during profile update' });
//     }
// });


  // app.post('/profile', async (req, res) => {
  //   try {
  //     console.log('Received profile update req:', req.body);
  //     const { name, newPassword } = req.body;
  //     const user = await User.findByIdAndUpdate(req.user._id);
  
  //     if (user) {
  //       user.name = name;
  //       if (newPassword) {
  //         user.password = newPassword;
  //       }
  
  //       await user.save();
  //       res.json({ message: 'Profile updated successfully', user });
  //     } else {
  //       res.status(404).json({ message: 'User not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     res.status(500).json({ error: 'An error occurred during profile update' });
  //   }
  // });
 

  // app.put('/profile', async (req, res) => {
  //   try {
  //     console.log('Received profile update req:', req.body);
  //     const { name, newPassword } = req.body;
  //     const user = await User.findById(req.user._id);
  
  //     if (user) {
  //       user.name = name;
  //       if (newPassword) {
  //         user.password = newPassword;
  //       }
  
  //       await user.save();
  //       res.json({ message: 'Profile updated successfully', user });
  //     } else {
  //       res.status(404).json({ message: 'User not found' });
  //     }
  //     res.json({ message: 'Profile updated successfully', user });

  //   } catch (error) {
  //   console.error('Error updating profile:', error);
  //   res.status(500).json({ error: 'An error occurred during profile update' });
  //   }
  //   console.log(req.body);
  // });

  // app.get("/profile",(req,res)=>{
  //   res.send("This is the Profile page");
  // });
  
  // app.put("/profile",async (req,res)=>{
  //   console.log(req.body);
  // })

  app.put('/profile/', async (req, res) => {
    try {
        // console.log('Received profile update req:', req.body);
        const { email, name, currentPassword, newPassword } = req.body;

        // Step 1: Find the User by Email
        const userWithCurrentPassword = await User.findOne({ email });
        // console.log(userWithCurrentPassword._id)
        if (userWithCurrentPassword) {
            // Step 2: Verify the Current Password
            if (currentPassword === userWithCurrentPassword.password) {
                // Step 3: Update the User
                userWithCurrentPassword.name = name;
                if (newPassword) {
                    // Update the password without hashing (not recommended for production)
                    userWithCurrentPassword.password = newPassword;
                }
                await userWithCurrentPassword.save();
                res.json({ message: 'Profile updated successfully', user: userWithCurrentPassword });
            } else {
                // res.status(401).json({ message: 'Incorrect current password' });
                alert("Incorrect Current Password");
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating profile: (Check Current Password)', error);
        res.status(500).json({ error: 'An error occurred during profile update' });
    }
});

app.delete('/deleteAccount', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Step 1: Find the User by Email and Password
      const userToDelete = await User.findOne({ email, password });

      if (userToDelete) {
          // Step 2: Delete the User
          await User.deleteOne({ _id: userToDelete._id });
          res.json({ message: 'Account deleted successfully' });
      } else {
          res.status(404).json({ message: 'User not found or password is incorrect' });
      }
  } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ error: 'An error occurred during account deletion' });
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