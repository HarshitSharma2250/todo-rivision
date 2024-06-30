const mongoose=require("mongoose")

const schemamodel=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:Array,required:true}
},{
    versionKey:false,
    timestamps:true
})
const usermodel=mongoose.model("todoapp",schemamodel)
module.exports=usermodel