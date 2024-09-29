import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
//pages
import Login from './LogIn';
import Signup from './SignUp';

import '../css/splash.css'; 
import '../css/navigation.css'; 

//only have this to be able to demo other pages since sign up and login doesnt work yet

import Navigation from '../components/Navigation';

class Splash extends React.Component {

  
    handleSignUp = () => {
        console.log('Sign Up clicked');
      };
    
      handleLogIn = () => {
        console.log('Log In clicked');
      };

  render() {
    return (
        
      <div className="splash-container">
        <Navigation />
        <h1 className="heading">Mixr</h1>
        <div className="button-container">
            <NavLink className="button sign-up" to="/Signup">
                Sign Up
            </NavLink>
            <NavLink className="button log-in" to="/Login">
                Log In
            </NavLink>
        </div>
      </div>
    );
  }
}

export default Splash;
