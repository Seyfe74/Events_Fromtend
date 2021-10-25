import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';


class Login extends Component {
    state = {
        
        username: '',
        password: '',  
            
    }


    loginUser =async () =>{
        const jwt = localStorage.getItem('token');
       let response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {username:this.state.username,password:this.state.password })
            localStorage.setItem('token' , response.data.access);
            this.setState({loggedIn : true});
            window.location = "/";
            console.log("user",this.props.user.user_id);
        
          }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();        
        this.loginUser();
        
    };
  
    render(){
       
       
        if(this.props.user.user_id == 2 ){
            console.log("user2", this.props.user.user_id)

            return <Redirect to={'/moderatorpage'}  />
          }
       
        return(
            <React.Fragment>
            
            <form onSubmit={(event) => this.handleSubmit(event)} className="container">
                <label>User Name</label>
                <input type="text" name="username"onChange={this.handleChange} value={this.state.username}/>
                <label>Password</label>
                <input type="text" name="password"onChange={this.handleChange} value={this.state.password}/>          
                <button type="submit" class="btn btn-success">Login</button>
            </form>
            </React.Fragment>
        );
    }
}
export default Login;