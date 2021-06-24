import React,{Component} from 'react';
import axios from 'axios';
import OutsideClickHandler from "./outsideclickhandler.component"
import deleteimage from "./delete.png"
import addimage from "./add.svg"
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuth,getCookie } from '../helpers/auth';



export default class NoteList extends Component
{

    constructor(props)
    {
        super(props);

        this.deleteNote=this.deleteNote.bind(this);

        this.state={notes:[],
            show:false,
            notedata:"Empty",
            noteclass:"hidden",
            noteuser:"",
            noteid:"",
            newdata:"",
            isblur:"",
            isnew:"false",
            email:""
        };
    }



    showModal(id){
            var dataa=this.state.notes.filter(item=>
            {
                return item._id===id;
            })
            console.log(dataa);
            
            this.setState({notedata:dataa[0].notedata})
            this.setState({noteid:dataa[0]._id})
            this.setState({noteuser:dataa[0].username})
            this.setState({noteclass:"shown"});
            this.setState({isblur:"blurred"})
        }
 
    
    hideModal = () => {
        this.setState({noteclass:"hidden"});
        // this.componentDidMount();
        this.setState({isblur:""})
    };


    componentDidMount() {
        const aloo=isAuth();
        console.log(aloo.email);
        this.setState({email:aloo.email});
        this.setState({noteuser:aloo.name});
        axios.get('http://127.0.0.1:5000/notes/email/'+aloo.email).then(response =>{
            this.setState({notes:response.data});
        }).catch((error)=>console.log(error));
    }

    addnew()
    {

        var newnote=axios.post('http://127.0.0.1:5000/notes/add/', {
                        "username": this.state.noteuser,
                        "notedata": "Hello I am new",
                        "email":this.state.email
                        }).then(function(userID) {
                            return userID;
                        });
        
        
                        const printAddress = () => {
                            newnote.then(async a => {
                            console.log(a.data._id);

                            axios.get('http://127.0.0.1:5000/notes/email/'+this.state.email).then(response =>{
                                this.setState({notes:response.data}),this.showModal(a.data._id);}).catch((error)=>console.log(error));
                            });
                        };
                        
                        printAddress();

    }

    deleteNote(id)
    {
        this.hideModal();
        axios.delete('http://127.0.0.1:5000/notes/'+id).then(res=> console.log(res.data));
        this.setState({
            notes:this.state.notes.filter(el=>el._id !== id)
        })
    }

    notesList()
    {
        return this.state.notes.map(currentnote =>{
            return (
            <div className="hellothere">
                <a className="notes-wrapper btn btn-1" href="#" onClick={(param) => this.showModal(currentnote._id)}>
                <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%"/>
                 </svg>
           
                    <p className="notes-data">
                    {currentnote.notedata}
                    </p>
              
                </a>
                
        
            </div>
            )
        })
    }

    myChangeHandler =  (event) => {
            this.setState({  notedata: event.target.value });
            axios.post('http://127.0.0.1:5000/notes/update/'+this.state.noteid, {
            "username": this.state.noteuser,
            "notedata": event.target.value
            }).then(()=>{this.componentDidMount()})
     }


    



    render()
    {
        return(

       <div className="main-wrapper" >
             {isAuth() ? null: <Redirect to='/login' /> }
           <h3>Notes List</h3>
           <div className={"notes-list "+ this.state.isblur}>
               {this.notesList()}
            </div>

            <OutsideClickHandler onOutsideClick={() => { this.hideModal();console.log("outisde clicked") }} >

                <div className={"noteModal "+this.state.noteclass}>
                    <div className="noteclose">
                        <button className="close-button" onClick={this.hideModal}>X</button>
                    </div>
                        <textarea className="notes-input-field" onChange={this.myChangeHandler} type="text"  value={this.state.notedata} />
                       <img className="delete-button" onClick={(param)=>this.deleteNote(this.state.noteid)} src={deleteimage}/>
                    
                </div>
            </OutsideClickHandler>
           
            <div className="add-button-wrapper">
                <p className="glow-on-hover" type="button"  onClick={(param) => this.addnew()}>+</p>
                {/* <img src={addimage} onClick={(param) => this.addnew()}/> */}
            </div>
           
       </div>
              
        
           
        )
        
    }


}