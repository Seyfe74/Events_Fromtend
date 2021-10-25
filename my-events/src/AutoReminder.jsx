import React, { Component } from 'react';
import axios from 'axios';
import emailjs from "emailjs-com";
import{ init } from 'emailjs-com';
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
init("YOUR_USER_ID");



export default class AutoReminder extends Component {
    constructor(props){
        super(props);
        this.state = {
            templateId: ''
        }
    }


 sendEmail = (e)=> {
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
    .then((result) => {
        console.log(result.text);
        
    }, (error) => {
        console.log(error.text);
       

    });

    
} 
 
render(){

return(
    <div >
       <LinkContainer to="/moderatorpage"  >
      <Nav.Link>Back to Main </Nav.Link>
      </LinkContainer> 
 
    <div>
        <div className="container">
        <form onSubmit={this.sendEmail}>
               
                    <div className="col-8 form-group pt-2 mx-auto">
                        <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                    </div>
                    <div className="col-8 pt-3 mx-auto">
                        <input type="submit" className="btn btn-info" value="Send Reminder"></input>
                    </div>
              
            </form>
        </div>
    </div>
    </div>
)

}

}
