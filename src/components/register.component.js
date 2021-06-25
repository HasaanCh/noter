import React,{Component} from 'react';
import { authenticate, isAuth } from '../helpers/auth';
import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';

export default class Register extends Component
{

    constructor(props)
    {
        super(props);

       

        this.state={
            email:"",
            password:"",
            name:"",
            infotext:"Hello Dolly",
            infoclass:"hidden"
        };

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    onChange=(e)=>
    {

        if(e.target.type==="text")
        {
         this.setState({name:e.target.value});
        }

       if(e.target.type==="email")
       {
        this.setState({email:e.target.value});
       }
      

       if(e.target.type==="password")
       {
        this.setState({password:e.target.value});
       }
        
    }



    handleSubmit(e)
    {
        console.log(e);
        e.preventDefault();

        axios.post(`https://backendprojectnoter.herokuapp.com/api/register`,{
            name:e.target[0].value,
            email:e.target[1].value,
            password:e.target[2].value,
        }).then(res=>{
            console.log(res);
            this.setState({infotext:res.data.message});
            this.setState({infoclass:"shown"})

        }).catch(error=> {
            this.setState({infotext:"Email already Exists or wrong email address"});
            this.setState({infoclass:"shown"})
        })
    }



    render()
    {
        return(
            
        <div className="registration-form custom-form">
            {isAuth() ? <Redirect to='/' /> : null}
            <form
                className='mx-auto max-w-xs relative '
                onSubmit={this.handleSubmit}
              >

                <input
                  type='text'
                  placeholder='Name'
                  onChange={this.onChange}
                  value={this.state.name}
                />


                <input
                  type='email'
                  placeholder='Email'
                  onChange={this.onChange}
                  value={this.state.email}
                />
                <input
                 
                  type='password'
                  placeholder='Password'
                  onChange={this.onChange}
                  value={this.state.password}
                />
                <button
                  type='submit'            >
                  <span className='ml-3'>Sign In</span>
                </button>
                
              </form>
              <div className={"custom-info "+this.state.infoclass}>{this.state.infotext}</div>
        </div>
       
        )
    }

}
