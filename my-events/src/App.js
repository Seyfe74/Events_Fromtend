import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import Moderatorpage from './Moderatorpage';
import AddEvent from './AddEvent';
import UpdateEvent from './UpdateEvent';
import DeleteEvent from './DeleteEvent';
import BuildProfile from './BuildProfile';
import Navbar from './Navbar';
import jwt_decode from "jwt-decode";
import Landingpage from './Landingpage';
import Home from './Home';
import Customers from './Customers';
import Comments from './Comments';
import VideoViewer from './VideoViewer';
import AutoReminder from './AutoReminder';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';





export default class App extends Component {
  state= {
    user:{},
    isnotLoggedin: false,
    isModerator: false

 };

 componentDidMount() {
    
    
  const jwt = localStorage.getItem('token');
  try{
  const user = jwt_decode(jwt);  
      this.setState({
        user: user
        
      });                     

          }catch {  
   }
   
  }





  render(){

   return(
    <BrowserRouter>
     <Header/>
    <div className="App">
      
     <Navbar user = {this.state.user}/> 
    <Switch>
     
     <Route exact path="/landingpage"  component={()=><Landingpage user = {this.state.user}/>}/>
      <Route exact path="/registration"  component={Registration}/>
       <Route exact path="/login"  component={()=><Login user = {this.state.user}/>}/>
       <Route exact path="/addEvent"  component={()=><AddEvent user = {this.state.user}/>}/>
       <Route exact path="/updateEvent"  component={()=><UpdateEvent user = {this.state.user}/>}/>
       <Route exact path="/deleteEvent"  component={()=><DeleteEvent user = {this.state.user}/>}/>
       <Route exact path="/buildProfile"  component={()=><BuildProfile user = {this.state.user}/>}/>
       <Route exact path="/reminder"  component={AutoReminder}/>
       <Route exact path="/videoviewer"  component={()=><VideoViewer user = {this.state.user}/>}/>
       <Route exact path="/comments"  component={Comments}/>
       <Route exact path="/moderatorpage"  component={()=><Moderatorpage user = {this.state.user}/>}/>
       <Route path="/home"  component={()=><Home user = {this.state.user}/>}/>
       <Route path="/customers"  component={()=><Customers user = {this.state.user}/>}/>
   
  </Switch>
  </div>
 </BrowserRouter>
      

   );

   }}