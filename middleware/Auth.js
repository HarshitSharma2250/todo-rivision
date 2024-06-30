const jwt=require("jsonwebtoken")
const blacklist=require("../blocklisted/userdelete")

const Auth=(req,res,next)=>{
    const token=req.headers.autherization.split(" ")[1]
if(blacklist.includes(token)){
    return res.status(404).json({"mess":"you are blacklist by admin now , please login again"})
}

    if(token){
        const decoded=jwt.verify(token,"masai")
        if(!decoded){
           return res.status(404).json({"mess":"you are not autherized"})
        }
req.body.AdminName=decoded.name
req.body.AdminRole=decoded.role
req.body.AdminId=decoded.userId
next()
    }else{
        res.status(404).json({"mess":"token not found please try again"})
    }

    }

    module.exports=Auth