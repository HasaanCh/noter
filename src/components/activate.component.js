import React, { Component } from 'react';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default class Activate extends Component
{

    constructor(props)
    {
        super(props);

       

        this.state={
           token:"",
           infotext:"",
           infoclass:"hidden"
        };

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    // onChange=(e)=>
    // {

    //     if(e.target.type==="text")
    //     {
    //      this.setState({name:e.target.value});
    //     }

    //    if(e.target.type==="email")
    //    {
    //     this.setState({email:e.target.value});
    //    }
      

    //    if(e.target.type==="password")
    //    {
    //     this.setState({password:e.target.value});
    //    }
        
    // }



    handleSubmit(e)
    {
        let token = this.props.match.params.token;
        console.log(token);
        e.preventDefault();
        let {name}=jwt.decode(token);
        this.setState({infoclass:"shown"});
        this.setState({infotext:name})
        axios.post(`http://localhost:5000/api/activation`, {
          token
        })
        .then(res => {
            console.log(res);
            this.setState({infoclass:"shown"});
            this.setState({infotext:"Account Activated You can now Login from the Login Section"})
        })
        .catch(err => {
            console.log(err);
            this.setState({infoclass:"shown"});
            this.setState({infotext:"Error please contact at noter@waydevelopers.com"})
        });

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

                <button
                  type='submit'            >
                  <span className='ml-3'>Activate Account</span>
                </button>
                
              </form>
              <div className={"custom-info "+this.state.infoclass}>{this.state.infotext}</div>
        </div>
       
        )
    }

}