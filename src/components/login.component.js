import React,{Component} from 'react';
import { authenticate, isAuth } from '../helpers/auth';
import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component
{

    constructor(props)
    {
        super(props);

       

        this.state={
            email:"",
            password:"",
        };
    }

    onChange=(e)=>
    {
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

        axios.post(`http://localhost:5000/api/login`,{
            email:e.target[0].value,
            password:e.target[1].value
        }).then(res=>{
            authenticate(res);
            var win = window.open('/',"_self");
            win.focus();
            // toast.success(`Hey ${res.data.user.name}, Welcome back!`);
        }).catch(error=>console.log(error))
    }



    render()
    {
        return(
            
        <div>
            {isAuth() ? <Redirect to='/' /> : null}
            {/* <ToastContainer /> */}
            <form
                className='mx-auto max-w-xs relative '
                onSubmit={this.handleSubmit}
              >
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
        </div>
        )
    }

}
