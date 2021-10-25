import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';


  export default class Navbar extends Component {

    handleLogout=()=>{
        localStorage.clear();  

    }
    render() { 
     
         if(this.props.user.user_id == null ){
          <nav >
          <ul > 
      
           <Link to='/registration'>  <li>  Register </li>   </Link> 
      <Link to='/login' >  <li>  Login </li> </Link> 
      <h3 className="container"> You are not logged in! Please register if you are new user or login if you already have account.</h3>
      </ul>      
     </nav>  
         }else if(this.props.user.user_id == 2 ){
          return <Redirect to={'/moderatorpage'}  />
        }else {
          return <Redirect to={'/home'}  />
        }
        return (
         

                  <React.Fragment>
                    <Redirect to={'/landingpage'}  />
                </React.Fragment>
          
        );
        }      
      }
