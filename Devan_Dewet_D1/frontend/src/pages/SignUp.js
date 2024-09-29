import React from 'react';
import  { useState } from 'react';
import '../css/signup.css'; 

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }
  
    handleSubmit = (e) => {
        e.preventDefault();
       
        
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
    
        console.log('Form submitted:', this.state);
    };

    

  render() {
    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
  }
}

export default SignUp;
