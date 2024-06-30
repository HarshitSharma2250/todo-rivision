const mongoose=require("mongoose")

const schemamodel=mongoose.Schema({
    name:{type:String,required:true},
    title:{type:String,required:true},
    age:{type:Number,required:true},
    AdminName:{type:String,required:true},
    AdminId:{type:String,required:true}
},{
    versionKey:false,
    timestamps:true
})
const usermodel=mongoose.model("tododata",schemamodel)
module.exports=usermodel