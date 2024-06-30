const express=require("express")
const userRoute=express.Router()
const {register,login,blacklist}=require("../controllers/user.controller")
const Auth=require("../middleware/Auth")

userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.get("/logout",Auth,blacklist)


module.exports=userRoute
