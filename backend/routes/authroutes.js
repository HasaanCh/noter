const express=require("express")
const router=express.Router()


// Loading Controllers

// const resgistercontroller=require("../controller/authentication.controller.js")

router.route('/').post((req,res)=>
{
   const {name,email,password}=req.body;
   res.json({"Hello":"bacha"})
})

module.exports=router