const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const URL=process.env.MONGO_URL||"mongodb+srv://sharmaharshit295:Harshit2250@cluster0.rs4eabk.mongodb.net/todoData?retryWrites=true&w=majority&appName=Cluster0"
const connections=mongoose.connect(`${URL}`)

module.exports=connections