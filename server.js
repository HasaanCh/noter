const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

require('dotenv').config(
    {
        path:'./config/config.env'
    }
);

const app=express();
const port=process.env.PORT || 5000;
const userRouter=require('./routes/user.route');
const notesRouter=require('./routes/notes');
const authRouter=require('./routes/auth.route');

app.use(cors());
app.use(express.json());


const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});

const connection=mongoose.connection;
connection.once('open',()=>
{
    console.log("Mongoose database running successfully");
});



app.use('/notes',notesRouter);
// app.use('/users',userRouter);
// app.use('/register',authenticRouter);
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})


app.listen(port,()=>{
    console.log('server is running on port: '+port);
});