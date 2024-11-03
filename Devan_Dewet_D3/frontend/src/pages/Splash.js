import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/splash.css'; 
import logo from '../../public/assets/Logo.PNG'; 

class Splash extends React.Component {
  render() {
    return (
      <div className="splash-container">
        <div className="content-container">
          <div>
            <h1 className="heading">Mixr</h1>
            <div className="button-container">
              <NavLink className="button sign-up" to="/Signup">
                Sign Up
              </NavLink>
              <NavLink className="button log-in" to="/Login">
                Log In
              </NavLink>
              
            </div>
            <p className="description">
                Welcome to Mixr, the ultimate platform for discovering and sharing unique content.
              </p> 
          </div>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
