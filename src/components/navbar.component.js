import React,{Component} from 'react';
import {Link} from 'react-router-dom';


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
                    </div>
                </div>
            </div>
               
        </header>
        )
        
    }


}