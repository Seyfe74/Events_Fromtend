import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


class Profile extends Component {
    
    state = {
        choosenEvents:[],  
        eventId: 0,
        event: '',
        event_timeInPT: '',
        event_timestamp: '',
        event_videoId: '',
        event_category:'',
    }


    deleteEvent =async () =>{
        let response = await axios.delete(`http://127.0.0.1:8000/api/events/delete/${this.state.eventId}`, { eventId:this.state.eventId})
            console.log(response);

    }

   

   

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    

    handleDelete = (event) => {
        event.preventDefault(); 
        this.deleteEvent();   
        
    };
   
        

    render(){
          
        return(
            <React.Fragment  >
    <LinkContainer to="/moderatorpage"  >
      <Nav.Link>Back to Main </Nav.Link>
      </LinkContainer>

      

<div className="container"> 
 
            <form >       
                <label>Event Id</label>
                <input type="text" name="eventId"onChange={this.handleChange} value={this.state.eventId}/>
                <button type="button" class="btn btn-danger" onClick={(event) =>   this.handleDelete(event)} >Delete Event</button>
            </form>


             </div>
            </React.Fragment>
        );
    }
}
export default Profile;