const mongoose = require("mongoose");

const Schema=mongoose.Schema;


const notesScehma=new Schema({
  notedata:{type:String},
  username:{type:String},
  email:{type:String}
},
{
    timestamps:true
});

const Notes = mongoose.model('Notes',notesScehma);

module.exports=Notes;