const express=require("express")
const todoRoute=express.Router()
const Auth=require("../middleware/Auth")
const Todoschema=require("../modules/todo.module")

todoRoute.post("/create",Auth,async(req,res)=>{
const{name,title,age,AdminName,AdminId,AdminRole}=req.body

if(AdminRole.includes("CREATER")){
    const storedata=new Todoschema({name,title,age,AdminName,AdminId})
await storedata.save()
res.status(400).json({"mess":"data added successfully"})
}else{
    res.status(400).json({"mess":"you are not autherized"})
}

})

todoRoute.get("/get-all", Auth, async (req, res) => {
    const { AdminRole } = req.body;
    const { ageold, agenew, dateold, datenew, name, title } = req.query;
    const query = {};

    if (AdminRole.includes("VIEW_ALL")) {
        try {
            let userfind;

            if (ageold === "1") {
                userfind = await Todoschema.find({}).sort({ age: 1 });
            } else if (agenew === "1") {
                userfind = await Todoschema.find({}).sort({ age: -1 });
            } else if (dateold === "1") {
                userfind = await Todoschema.find({}).sort({ createdAt: 1 });
            } else if (datenew === "1") {
                userfind = await Todoschema.find({}).sort({ createdAt: -1 });
            } else if (name) {
                query.name = new RegExp(name, 'im');
                userfind = await Todoschema.find(query);
            } else if (title) {
                query.title = new RegExp(title, 'im'); 
                userfind = await Todoschema.find(query);
            } else {
                userfind = await Todoschema.find();
            }

            res.status(200).json({ "mess": userfind });
        } catch (error) {
            res.status(500).json({ "mess": "An error occurred", "error": error.message });
        }
    } else {
        res.status(403).json({ "mess": "you are not authorized" });
    }
});


todoRoute.delete("/delete/:id",Auth,async(req,res)=>{
    const{AdminRole,AdminId}=req.body
    const{id}=req.params;
    const finduser=await Todoschema.findById(id)
    if(finduser){
        if(AdminRole.includes("CREATER") && AdminId===finduser.AdminId){
            await Todoschema.findByIdAndDelete(id)
                 res.status(400).json({"mess":"user has been deleted"})
             }else{
                 res.status(400).json({"mess":"you are not autherized"})
             }
    }else{
        res.status(404).json({"mess":"user not found , please check again"})
    }
})

todoRoute.patch("/update/:id",Auth,async(req,res)=>{
    const{AdminRole,AdminId}=req.body
    const{id}=req.params;
     const data=req.body
    const finduser=await Todoschema.findById(id)
    if(!finduser){
        return  res.status(400).json({"mess":"user not found , please check again"})
    }
    if(AdminRole.includes("CREATER") && AdminId===finduser.AdminId){
        await Todoschema.findByIdAndUpdate(id,data)
        res.status(400).json({"mess":"user has been updated"})
    }else{
        res.status(404).json({"mess":"user not found , please check again"})
    }
})





module.exports=todoRoute