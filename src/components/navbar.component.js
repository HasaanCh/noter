import React,{Component} from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component
{

    render()
    {
        return(
            <header class="main-header">
        <div class="left-logo">
            <h3>
                <Link to="/" className="logo-link">Noter
                </Link>
                </h3>
        </div>
    
        <div class="right-header">
            <div class="items">
                    <div class="profile item-header">
                        <Link to="/" className="notes-link">Notes</Link>
                </div>
            </div>
        </div>
    </header>
        )
        
    }


}