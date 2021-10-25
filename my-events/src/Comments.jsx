import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';




class Comments extends Component {
    state = {

        allComments: [],
        eventId: 0,
        content: '',
        
    }


    getComments =async () =>{ 
       let response = await axios.get('http://127.0.0.1:8000/api/events/comments/');
       var newArray = response.data;      
       this.setState({ allComments: newArray})
       }

    postComments =async () =>{    
        let response = await axios.post('http://127.0.0.1:8000/api/events/comments/', {content:this.state.content,event:this.state.eventId })
        console.log(response);
             
          }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();        
        this.postComments();
        this.getComments();
        console.log({content:this.state.content, event:this.state.eventId});
        console.log("All Comments" , this.state.allComments);
    };

    handleClick = (event) => {
        event.preventDefault(); 
        this.getComments();
    
    };
  
    render(){
       
       
        
       
        return(
            <React.Fragment  >
            <LinkContainer to="/home"  >
            <Nav.Link>Back to Main </Nav.Link>
           </LinkContainer>
           
            <div> 
              <form  onSubmit={(event) => this.handleClick(event)} className="container">
              <h2> Comments below to see other people comments</h2>
             {this.state.allComments.map(item =>
              <tr key={item.id}>
                  <td>{item.content}</td>
                  <td>{item.event}</td> 
                  <td>  </td> 
                  {/* <button onClick={(event) =>  this.handleClick(event)} > ViewComments </button>  */}
                
              </tr>
              
              )} 
              <button class="btn btn-success" onClick={(event) =>  this.handleClick(event)} > Read Comments </button> 
               </form>
               </div>

            <form onSubmit={(event) => this.handleSubmit(event)} className="container">
                <label>Content</label>
                <input type="text" name="content"onChange={this.handleChange} value={this.state.content}/>
                <label>Event ID</label>
                <input type="text" name="eventId"onChange={this.handleChange} value={this.state.eventId}/>          
                <button type="submit" class="btn btn-success" >Post Comment</button>
            </form>

           
            </React.Fragment>
        );
    }
}
export default Comments;