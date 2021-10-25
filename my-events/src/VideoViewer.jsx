import React, { Component} from "react";
import axios from "axios";
import Countdown from "./Countdown";
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';




class VideoViewer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
            video:'',
            title: '',
            user: 1,
            timestamp: '' ,
            localUTC:'',
            allEvents:[],
            choosenEvent:[],
            eventName:'',
            eventTimePT:'',
            eventTimeLocal:'',
            eventId:0,
            customer:[],
            
         }
    }

    

    componentDidMount(){
        this.getEventId();
        
        this.getCustomer();
       

    }

    getCustomer =async () =>{

        let response = await axios.get('http://127.0.0.1:8000/api/events/customer/')
             var user = this.state.user;
             var newArray = response.data.filter(function(el){
                return (el.user == user ) 
        }); 
        this.setState({  customer:  newArray})
        console.log('getCustomer' ,  this.state.customer)
    }

    getUTC = ()=>{
         var tzone = this.state.customer[0].timezone; 
         this.setState({ localUTC:  tzone})
         console.log ("getUTC",this.state.localUTC)

    }
            
          
         
    
     getLocalTime = ()=>{
         var edate = new Date(this.state.eventTimePT);
         var eventTimestamp = edate.getTime()  + (1000 * 60 * 60 * 7 );

         if(this.state.localUTC == "UTC-7"){
            var adjTimestamp =  eventTimestamp + (1000 * 60 * 60  )

         }else if(this.state.localUTC == "UTC-6"){
            var adjTimestamp =  eventTimestamp + (1000 * 60 * 60 * 2 ) 
         }else if(this.state.localUTC == "UTC-5"){
            var adjTimestamp =  eventTimestamp + (1000 * 60 * 60 * 3 ) 
         }else {
            var adjTimestamp =  eventTimestamp  

         }

         
         var adjustedLocal1 = new Date(adjTimestamp);
         var adjustedLocal2 = adjustedLocal1.toLocaleString();
         //console.log ("changed to delay 1 hour date",adjustedLocal2)
         //console.log ("User",this.props.user.user_id)

         this.setState({
            timestamp: eventTimestamp,
            eventTimeLocal:adjustedLocal2,
           
        })
       
     }

    // async getVideo(){
    //     let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${this.state.video}&key=AIzaSyByYNis8DwlkG0UZrKcxhZFdjJTZ4HTEj0&part=snippet,statistics`)
    //     this.setState({
           
    //         title:response.data.items[0].snippet.title,
           
    //     })
       
    // }

    getEventId = async()=>{
        let response = await axios.get('http://127.0.0.1:8000/api/events/choosenEvents/');
        this.setState({
            user:this.props.user.user_id,    
           
        })
        var user = this.state.user;
             var newArray = response.data.filter(function(el){
                return (el.customer === user )  
        });
        var eventId = newArray[0].event;
        this.setState({ eventId:  eventId})
        console.log('getEventId' ,  this.state.eventId)
        
        }


        getEvents = async()=>{
            let response = await axios.get('http://127.0.0.1:8000/api/events/events/');
            var id = this.state.eventId;
                 var newArray = response.data.filter(function(el){
                    return (el.id == id )  
            });

            var eventTime = newArray[0].event_timeInPT;
            var eventName = newArray[0].event;
            var eventVideoId = newArray[0].event_videoId;
           
            this.setState({ 
                eventTimePT:  eventTime,
                eventName: eventName,
                video: eventVideoId
            })
             console.log ("getEvents",this.state.eventTimePT)
            
            }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
     };



     handleSubmit = (event) => {
        event.preventDefault();
        this.getEventId();
        this.getEvents();
        this.getCustomer();
        this. getUTC();
        this.getLocalTime();
       
    };

    render(){ 
        return ( 
            <React.Fragment  >
            <LinkContainer to="/home"  >
            <Nav.Link>Back to Main </Nav.Link>
           </LinkContainer>
           <form form onSubmit={(event) => this.handleSubmit(event)} className="container">
            <div  className="container">
            <h3>Time Remaining . . . </h3>
            <Countdown countdownTimestampMs={this.state.timestamp}  />
            <h3> Event will start in Local Time {this.state.eventTimeLocal} </h3>
            <div className="mx viewer" >
            <div className="container" >
                   <div className="row" >
                       <div className= "col">
                            <iframe title= "videoViewer" id="ytplayer" type="text/html" width="600" height="460"
                            src={`https://www.youtube.com/embed/${this.state.video}`}
                            frameborder="0"></iframe>
                            <h4>{this.state.title}</h4>
                            <br/>

                        </div>
                        </div>
                        </div>
                        </div>
         </div>
         <h2> Event Name: {this.state.eventName}</h2>
         <button type="submit" class="btn btn-success" onClick={this.handleSubmit} >Refrash</button>
         <button type="submit" class="btn btn-success" onClick={this.handleSubmit} >Start</button>
         </form>
         </React.Fragment  >
        )
    }
}
 
export default VideoViewer;