const router=require('express').Router();
let User=require('../models/user.model.js');


router.route('/').post((req,res)=>
{
   const {name,email,password}=req.body;
   res.json({"Hello":"bacha"})
})

module.exports=router;