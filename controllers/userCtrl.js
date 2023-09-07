const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // create user
    const newUser = User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400).json({ message: "User already exists" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if(findUser && await findUser.matchPassword(password)){
        res.status(200).json({message:"User logged in successfully"});
    }else{
        res.status(400).json({message:"Invalid email or password"});
    }
});

const getallUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message:"User not found"});
    }
});

const removeUser = asyncHandler(async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User removed successfully"});
    }
    catch(error){
        res.status(404).json({message:"User not found"});
    }
});

const updateUser = asyncHandler(async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{
            fname:req?.body?.fname,
            lname:req?.body?.lname,
            email:req?.body?.email,
            mobile:req?.body?.mobile,
        },{new:true});
        console.log(req.body);
        res.status(200).json({message:"User updated successfully",data:user});
    }
    catch(error){
        res.status(404).json({message:"User not found"});
    }
});
module.exports = { createUser , loginUser , getallUsers , getUserById , removeUser , updateUser};
