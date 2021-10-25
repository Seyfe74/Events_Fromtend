import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class RegisterUser extends Component {
    state = {   
        userName: '',
        password: '',
        email: '', 
        firstName: '',
        lastName: '',        
        
    }

    registerUser =async () =>{

      
       let response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {username:this.state.userName,password:this.state.password,email:this.state.email,first_name:this.state.firstName,last_name:this.state.lastName})
            console.log(response);
            window.location = "/";
     

          }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.registerUser();
        this.setState({registered : true});
        console.log({username:this.state.userName,password:this.state.password,email:this.state.email,first_name:this.state.firstName,last_name:this.state.lastName});
    };
   
        

    render(){
        if(this.state.registered){
            <Redirect to={'/landingpage'}  />   
            }
        
        return(
            <React.Fragment>
            <form onSubmit={(event) => this.handleSubmit(event)} className="container">
                
                <label>User Name</label>
                <input type="text" name="userName"onChange={this.handleChange} value={this.state.userName}/>
                <label>Password</label>
                <input type="text" name="password"onChange={this.handleChange} value={this.state.password}/>
                <label>Email</label>
                <input type="text" name="email"onChange={this.handleChange} value={this.state.email}/>
                <label>First Name</label>
                <input type="text" name="firstName"onChange={this.handleChange} value={this.state.firstName}/>
                <label>Last Name</label>
                <input type="text" name="lastName"onChange={this.handleChange} value={this.state.lastName}/>
                <button type="submit"  class="btn btn-success">Register</button>
            </form>
            </React.Fragment>
        );
    }
}
export default RegisterUser;