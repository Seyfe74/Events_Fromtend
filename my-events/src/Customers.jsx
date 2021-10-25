import React, { Component } from 'react';
import axios from 'axios';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


class Customers extends Component {

   
        state = {
            timezone: '',
            location_state: '',
            userid: '',
            customerId: 0,
            event_category: 1,
            teamOrAthlet: 1,
            reminder_note: '',
            templateId: 'template_1v2ecm8',
            favoriteSport:[],
            favoriteTeamOrAthlet: [], 
            favorite_sport_id: '',
            favorite_teamOrAthlet_id: '' , 
            recommendedEvents:[], 
            recommendedEvents2:[],
            choosenEventId : 1,
        }

            recommendFromFavSport = async()=>{
                let response = await axios.get('http://127.0.0.1:8000/api/events/events');
                let id = parseInt(this.state.favorite_sport_id);       
                var newArray = response.data.filter(function(el){
                    return (el.event_category == id )
            });
                this.setState({ recommendedEvents: newArray})
               console.log('SearchResult' , newArray)
               console.log('SearchResult2' , response.data)
             }
        
            //  recommendFromFavTeam = async()=>{
            //     let response = await axios.get('http://127.0.0.1:8000/api/events/events');
            //     let term = this.state.favorite_teamOrAthlet_id;       
            //     var newArray = response.data.filter(function(el){
            //         return (el.event_name.includes(term) )
            // });
            //     this.setState({ recommendedEvents2: newArray})
            //    console.log('SearchResult' , this.state.recommendedEvents2)
            //    console.log('SearchResult2' , response.data)
            //  }
     
    

    

    chooseEvent =async () =>{
       let response = await axios.post('http://127.0.0.1:8000/api/events/choosenEvents/', {reminder_note:this.state.reminder_note,customer:this.state.customerId, event:this.state.choosenEventId})
            console.log(response);
            //window.location = "/";
           // user:this.props.user.user_id,

          } 

    registerCustomer =async () =>{

       let response = await axios.post('http://127.0.0.1:8000/api/events/customer/', {timezone:this.state.timezone, location_state:this.state.location_state, user:this.props.user.user_id, event_category:parseInt(this.state.favorite_sport_id),teamOrAthlet:parseInt(this.state.favorite_teamOrAthlet_id) ,templateId:this.state.templateId})
            console.log(response.data.id);  
            this.setState({ customerId: this.props.user.user_id});
               }

     searchEventCategory = async()=>{
        let response = await axios.get('http://127.0.0.1:8000/api/events/categories');
        var newArray = response.data;
           
        this.setState({ favoriteSport: newArray})
        }
    
    searchTeamOrAthlet = async()=>{
            let response = await axios.get('http://127.0.0.1:8000/api/events/teamOrAthlet');
            var newArray = response.data;
               
            this.setState({ favoriteTeamOrAthlet: newArray})
            }

    getSelectedSport= async ()=>{
        var selectedSport =await document.getElementById("list1").value;
        this.setState({ favorite_sport_id: selectedSport})
     }
        
    getSelectedTeamOrAthlet= async ()=>{
        var selectedTeamOrAthlet =await document.getElementById("list2").value;
        this.setState({ favorite_teamOrAthlet_id: selectedTeamOrAthlet})
                
     }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            customerId: this.props.user.user_id
        })
    };

    getEventId = (itemId) =>{
        console.log("ITMID" , itemId);
        this.setState({
            choosenEventId: itemId
        })
       
     }; 


    handleSubmit = (event) => {
        event.preventDefault();
        event.preventDefault();
        this.searchEventCategory(); 
        this.searchTeamOrAthlet();
        this.getSelectedSport();
        //this.getSelectedTeamOrAthlet();
        this.recommendFromFavSport();
        // this.recommendFromFavTeam();
        this.registerCustomer();
        this.setState({registered : true});
        this.getEventId(); 
        console.log({timezone:this.state.timezone, location_state:this.state.location_state,user:this.props.user.user_id,event_category:parseInt(this.state.favorite_sport_id),teamOrAthlet:parseInt(this.state.favorite_teamOrAthlet_id) ,templateId:this.state.templateId});
        console.log("UserId", this.props.user.user_id);
    
    };

    handleClick = (event) => {

    event.preventDefault();
   
    this.chooseEvent(); 
  
      
    console.log({reminder_note:this.state.reminder_note,customer:this.state.customerId, event:this.state.choosenEventId});
    };
    


     




    handleReview = (event) => {

        event.preventDefault();
       
        //this.chooseEvent();    
        };
    
        

    render(){
       
        return(
          <React.Fragment  >
          <LinkContainer to="/home"  >
          <Nav.Link>Back to Main </Nav.Link>
         </LinkContainer>

            <form form onSubmit={(event) => this.handleSubmit(event)} className="container">
                <label>
          Choose Favorite Sport
          <select id="list1" onChange={this.getSelectedSport}>
            {this.state.favoriteSport.map(item => (
              
              <option key={item.id} value={item.id}>
                {item.event_category}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />

        {/* <label>
          Choose Favorite Team or Athlet
          <select id="list2" onChange={this.getSelectedTeamOrAthlet}>
            {this.state.favoriteTeamOrAthlet.map(item => (
              <option key={item.id} value={item.id}>
                {item.teamOrAthlet}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <label>Time Zone (UTC)</label>
                <input type="text" name="timezone"onChange={this.handleChange} value={this.state.timezone}/>
                <label>Location/State</label>
                <input type="text" name="location_state"onChange={this.handleChange} value={this.state.location_state}/> */}
                <br />
                 <br />
        <button type="submit" class="btn btn-success">Refrash Search</button>
        <button type="submit" class="btn btn-success">View Recommended Events</button>
             </form>
             {/* {this.state.recommendedEvents2.map(item =>
             
             <tr key={item.id}>
                 
                 <td>{item.event_name}</td>       
             </tr>
             )}  */}
          
          <form className="container">
              <h2> Below is the event matching your selection</h2>
             {this.state.recommendedEvents.map(item =>
              
              <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.event}</td> 
                  <td>  </td> 
                  <input type="text" name="reminder_note" placeHolder = "Leave Reminder instruction here"onChange={this.handleChange} value={this.state.reminder_note}/>
                  <button onClick={(event) =>{   this.handleClick(event); this.getEventId(item.id);    }} > Choose Event</button> 
                  {/* <button onClick={() => this.redirect()}  > Read Comments</button>   */}
                  
              </tr>
              
              )} 
               </form>
           
            </React.Fragment>
        );
    }
}
export default Customers;