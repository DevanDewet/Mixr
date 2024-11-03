import React from 'react';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            profilePicture: '',
            bio: '',
            message: '',
            errors: {}
        };
    }

    validateEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm = () => {
        const errors = {};
        const { username, email, password, confirmPassword } = this.state;

        if (!username) errors.username = 'Username is required.';
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!this.validateEmail(email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!password) errors.password = 'Password is required.';
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

        this.setState({ errors });
        return Object.keys(errors).length === 0; 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        const { username, email, password, profilePicture, bio } = this.state;

        // Send form data to the backend
        fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                profilePicture,
                bio
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || 'Sign Up failed. Please try again.') });
            }
            return response.json();
        })
        .then(data => {
            this.setState({ message: `Welcome, ${username}. You have successfully signed up!` });

          
            this.setState({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                profilePicture: '',
                bio: '',
                errors: {}
            });

            this.props.navigate('/LogIn');
        })
        .catch(error => {
            this.setState({ message: error.message });
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="signup-container">
                <h1>Sign Up</h1>
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <label htmlFor="profilePicture">Profile Picture URL:</label>
                        <input
                            type="text"
                            id="profilePicture"
                            name="profilePicture"
                            value={this.state.profilePicture}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="bio">Bio:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                {this.state.message && <p>{this.state.message}</p>}
                <button onClick={() => this.props.navigate('/')} className="back-button">
                   Return
                </button>
            </div>
        );
    }
}

const SignUpWrapper = () => {
    const navigate = useNavigate();
    return <SignUp navigate={navigate} />;
};

export default SignUpWrapper;
