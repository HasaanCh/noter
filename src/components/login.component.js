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
            loginbuttontext:"Login",
            loginnotification:"Wrong Email or Password",
            notiifactionshown:"hidden"
        };

        this.handleSubmit=this.handleSubmit.bind(this);
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
        this.setState({notiifactionshown:"hidden"});
        this.setState({loginbuttontext:"Please Wait"});
        axios.post(`https://backendprojectnoter.herokuapp.com/api/login`,{
            email:e.target[0].value,
            password:e.target[1].value
        }).then(res=>{
            authenticate(res);
            var win = window.open('/',"_self");
            win.focus();
            this.setState({loginbuttontext:"Login"})
            // toast.success(`Hey ${res.data.user.name}, Welcome back!`);
        }).catch(error=>{console.log(error);
          this.setState({loginbuttontext:"Login"});
          this.setState({notiifactionshown:"shown"});
          // this.setState()
        })
    }



    render()
    {
        return(
            
        <div className="custom-form">
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
                  <span className='ml-3'>{this.state.loginbuttontext}</span>
                </button>
                <div className={"custom-info "+this.state.notiifactionshown}>{this.state.loginnotification}</div>
              </form>
        </div>
        )
    }

}
