import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';




class Home extends Component {
    constructor(props) {
        super(props);
        
         console.log("user",this.props.user.user_id)
    }

    

    componentDidMount() {
       
    } 


    // async getAllProducts() {
    //     let response = await axios.get('https://localhost:44394/api/product');
    //     this.setState({
    //         products: response.data
    //     });
    //     console.log('products',response.data)
    // }

    // async getSpecificProduct() {
    //     let response = await axios.get('https://localhost:44394/api/product/1/product');
    //     this.setState({
    //         product: response.data
    //     })
    // }

    // async getAllReviews() {
    //     let response = await axios.get('https://localhost:44394/api/review');
    //     this.setState({
    //         reviews: response.data
    //     });
    // }

    handleLogout=()=>{
        localStorage.clear();
        window.location = "/";
       
    }


    render() { 

        //   if(this.props.user.user_id == 2 ){

        //     return <Redirect to={'/moderatorpage'}  />
        //   }



        return ( 
            <React.Fragment  >
            <LinkContainer to="/" onClick={()=> this.handleLogout()} >
            <Nav.Link>logout  </Nav.Link>
            </LinkContainer>

               <div  className="container" > 
                <h3> Welcome  !</h3> 
                
                <Link to='/buildProfile'  >  <li>Create Profile </li> </Link> 
                <Link to='/comments'  >  <li> Read/Post Comments </li> </Link> 
                <Link to='/customers'  >  <li> Choose Events </li> </Link>
                <Link to='/videoviewer'  >  <li>My Events </li> </Link> 
              
                </div>
              

            </React.Fragment>
         )
    }
}

 
export default Home;