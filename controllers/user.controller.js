const bcrypt = require('bcrypt');
const userschema=require("../modules/user.module")
const jwt=require("jsonwebtoken")
const blockuser=require("../blocklisted/userdelete")

const register=async(req,res)=>{
const{name,email,password,role}=req.body
try {
    bcrypt.hash(password, 5,async function(err, hash) {
       if(err){
        res.status(404).json({"mess":err.message})
       }
       if(hash){
        const user=new userschema({name,email,password:hash,role})
        await user.save()
        res.status(400).json({"mess":"user register successfully"})
       }else{
        res.status(404).json({"mess":"something wrong wwhile createing password"})
       }
    });
} catch (error) {
    res.status(404).json({"mess":error.message})
}


}

const login=async(req,res)=>{
    const{email,password}=req.body
    const user=await userschema.findOne({email})
    if(!user){
        res.status(404).json({"mess":"invalid credentials "})
    }
    try {
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
             res.status(404).json({"mess":"somwthing went wrong , while comparing password"})
            }
            if(result){
             const AccessToken=jwt.sign({name:user.name,role:user.role,userId:user._id},"masai",{expiresIn:"1h"})
             const RefrehToken=jwt.sign({name:user.name,role:user.role,userId:user._id},"masaischool",{expiresIn:"1d"})
             res.status(400).json({"mess":"login successfull","AccessToken":AccessToken,"RefrehToken":RefrehToken})
            }else{
             res.status(404).json({"mess":"password not matched"})
            }
         });
    } catch (error) {
        res.status(404).json({"mess":error.message})
    }
}

const blacklist=async(req,res)=>{
    const token=req.headers.autherization.split(" ")[1]
    if(token){
        blockuser.push(token)
        res.send(`token added in blacklist`)
    }
}

module.exports={register,login,blacklist}