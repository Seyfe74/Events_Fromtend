import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


class AddEvent extends Component {
    
    state = {
        choosenEvents:[],  
        eventId: 0,
        event: '',
        event_timeInPT: '',
        event_timestamp: '',
        event_videoId: '',
        event_category:'',
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

    

    getTimestamp = () =>{
        var edate = new Date(this.state.event_timeInPT);
        var eventTimestamp = edate.getTime();
        this.setState({
            event_timestamp: eventTimestamp
        })

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    
    handleEvent = (event) => {
        event.preventDefault(); 
        this.addEvent();   
        this.getVideoId();
    };

    render(){
          
        return(
            <React.Fragment  >

    <LinkContainer to="/moderatorpage"  >
      <Nav.Link>Back to Main </Nav.Link>
      </LinkContainer>

<div className="container"> 

 



            <form >
   
                <label>Event Name</label>
                <input type="text" name="event"onChange={this.handleChange} value={this.state.event}/>
                <label>Event Time</label>
                <input type="text" name="event_timeInPT"onChange={this.handleChange} value={this.state.event_timeInPT}/>
                <label>Event Timestamp</label>
                <input type="text" name="event_timestamp"onChange={this.handleChange} value={this.state.event_timestamp}/>
                <label>Category Id</label>
                <input type="text" name="event_category"onChange={this.handleChange} value={this.state.event_category}/>
                
                <button type="button" class="btn btn-success" onClick={(event) =>   this.handleEvent(event)} >Add Event</button>
                
            </form>

           

             </div>
            </React.Fragment>
        );
    }
}
export default AddEvent;