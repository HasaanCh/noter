import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { response } from 'express';

export default class NoteList extends Component
{

    constructor(props)
    {
        super(props);

        this.deleteNotes=this.deleteNotes.bind(this);

        this.state={notes:[]};
    }

    componentDidMount()
    {
        axios.get('http://127.0.0.1:5000/notes/').then(this.setState({notes:response.data})).catch(console.log(error));
    }

    deleteNote(id)
    {
        axios.delete('http://127.0.0.1:5000/notes/'+id).then(console.log(res.data));
        this.setState({
            notes:this.state.notes.filter(el=>el._id !== id)
        })
    }


    render()
    {
        return(
           <div>
               You are on Excercise Component
           </div>
        )
        
    }


}