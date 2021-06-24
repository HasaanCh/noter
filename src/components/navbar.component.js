import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import { signout } from '../helpers/auth';



export default class Navbar extends Component
{

    render()
    {
        return(
        <header className="main-header">
            <div className="inner-header">
            <div className="left-logo">
                    <h3 className="typing-demo">
                        <Link to="/" className="logo-link">Noter </Link>
                        </h3>
                </div>
            
                <div className="right-header">
                    <div className="items">
                            <div className="profile item-header">
                                <Link to="/" className="notes-link">Notes</Link>
                    </div>
                    <button
                  onClick={() => {
                    signout(() => {
                        var win = window.open('/login',"_self");
                        win.focus();
                    });
                  }}
                  >Logout
                      </button>
                    </div>
                </div>
            </div>
               
        </header>
        )
        
    }


}