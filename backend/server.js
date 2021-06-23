const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});

const connection=mongoose.connection;
connection.once('open',()=>
{
    console.log("Mongoose database running successfully");
});

const userRouter=require('./routes/users.js');
const notesRouter=require('./routes/notes.js');
const authenticRouter=require('./routes/authroutes.js');

app.use('/notes',notesRouter);
app.use('/users',userRouter);
app.use('/register',authenticRouter);

app.listen(port,()=>{
    console.log('server is running on port: '+port);
});