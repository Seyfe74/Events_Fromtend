import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';


export default class Landingpage extends Component{

    render(){ 
                
                return( 
                     <div className="container"> 
                    <nav >
                    <ul > 
                    <div className="container">
                     <Link to='/registration'  >  <li>  Register </li>   </Link> 
                     </div>
                     <div className="container">
                    <Link to='/login' >  <li>  Login </li> </Link> 
                    </div>
                <h3 className="container"> You are not logged in! Please register if you are new user or login if you already have account.</h3>
                </ul>      
               </nav> 
               </div> 
                )
    }}
