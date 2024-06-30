const express=require("express")
const server=express()
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT||8080;
const userdatabase=require("./config/db")
const userRoute=require("./routes/user.routes")
const Auth=require("./middleware/Auth")
const jwt=require("jsonwebtoken")
const TodoRoutes=require("./routes/todo.routes")

//middleware
server.use(express.json())
server.use(cors({
    origin:"http://127.0.0.1:5173"
}))


//routes
server.use("/user",userRoute)
server.use("/todo",TodoRoutes)

//rootes
server.get("/",(req,res)=>{
    server.status(400).json({"mess":"welcome home"})
})


//new access token

server.post("/token",Auth,async(req,res)=>{
    const{token}=req.body;
    if(!token){
       return res.status(404).json({"mess":"token not found"})
    }
const Refreshtoken=jwt.verify(token,"masaischool")
if(!Refreshtoken){
    return res.status(404).json({"mess":"invalid token try again"})
}
const AccessToken=jwt.sign({name:Refreshtoken.name,role:Refreshtoken.role,userId:Refreshtoken._id},"masai",{expiresIn:"1h"})
res.status(400).json({"AccessToken":AccessToken})
})







//server connect
server.listen(PORT,async()=>{
    try {
        await userdatabase;
        console.log(`server is running at port ${PORT} , db is also connected`)
    } catch (error) {
        console.log(error.message)
    }
})