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


    getchoosenEvents = async()=>{
        let response = await axios.get('http://127.0.0.1:8000/api/events/choosenEvents/');
        var newArray = response.data;  
        this.setState({ choosenEvents: newArray})
        }

    getVideoId = async () => {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyByYNis8DwlkG0UZrKcxhZFdjJTZ4HTEj0&part=snippet&q=${this.state.event}&maxResults=1`)
            
            
          this.setState({
            event_videoId:response.data.items[0].id.videoId
          })
          console.log("this is resp", this.state.event_videoId);
      };
    

    addEvent =async () =>{
        let response = await axios.post('http://127.0.0.1:8000/api/events/', {event:this.state.event, event_timeInPT:this.state.event_timeInPT, event_timestamp:this.state.event_timestamp, event_videoId:this.state.event_videoId, event_category:this.state.event_category})
            console.log(response);

    }

    updateEvent =async () =>{
        let response = await axios.put(`http://127.0.0.1:8000/api/events/update/${this.state.eventId}`, {event:this.state.event, event_timeInPT:this.state.event_timeInPT, event_timestamp:this.state.event_timestamp, event_videoId:this.state.event_videoId, event_category:this.state.event_category})
            console.log(response);

    }

    deleteEvent =async () =>{
        let response = await axios.delete(`http://127.0.0.1:8000/api/events/delete/${this.state.eventId}`, { eventId:this.state.eventId})
            console.log(response);

    }

    getTimestamp = () =>{
        var edate = new Date(this.state.event_timeInPT);
        var eventTimestamp = edate.getTime();
        this.setState({
            event_timestamp: eventTimestamp
        })

    };
        

    handleLogout=()=>{
        localStorage.clear();
        window.location = "/";

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.getchoosenEvents();   
    };

    handleEvent = (event) => {
        event.preventDefault(); 
        this.addEvent();   
        this.getVideoId();
    };

    handleUpdate = (event) => {
        event.preventDefault(); 
        this.updateEvent();   
        this.getVideoId();
        this.getTimestamp();
    };

    handleDelete = (event) => {
        event.preventDefault(); 
        this.deleteEvent();   
        
    };
   
        

    render(){
          
        return(
            <React.Fragment  >
      <LinkContainer to="/" onClick={()=> this.handleLogout()} >
      <Nav.Link>logout  </Nav.Link>
      </LinkContainer>

      

<div className="container"> 
<div className="container"> 


<h3> Welcome to Moderator Page</h3>
</div>
 

<form className="container">
            
            {this.state.choosenEvents.map(item =>
             
             <tr key={item.id}>
                 <td  >Customer Id:  {  item.customer  }    </td>
                 <td > Reminder Note:  {item.reminder_note} </td> 
                 <td> Choosen Event Id:  {item.event} </td> 
                 
                 <Link to='/reminder'  >  <li >  Send Reminder  </li> </Link> 
             </tr>
             
             )} 
             
             <button type="button" class="btn btn-success" onClick={(event) =>   this.handleSubmit(event)} > Review Customer's Profile/Choosen Events</button>
              </form>


            <form >
            <LinkContainer to="/addEvent"  >
      <Nav.Link>AddEvent  </Nav.Link>
      </LinkContainer>

      <LinkContainer to="/updateEvent"  >
      <Nav.Link>Update Event  </Nav.Link>
      </LinkContainer>

      <LinkContainer to="/deleteEvent"  >
      <Nav.Link>Delete Event  </Nav.Link>
      </LinkContainer>
   
               
                
            </form>

            


             </div>
            </React.Fragment>
        );
    }
}
export default Profile;