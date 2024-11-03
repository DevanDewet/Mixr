import React from 'react';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            errors: {}
        };
    }

    validateEmail = (email) => {
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateForm = () => {
        const errors = {};
        const { email, password } = this.state;

        if (!email) {
            errors.email = 'Email is required.';
        } else if (!this.validateEmail(email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!password) errors.password = 'Password is required.';

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.validateForm()) {
            return; 
        }

        const { email, password } = this.state;

        // Send login request
        fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }
            return response.json();
        })
        .then(data => {
            const { token, userId, username } = data;
            this.setState({ message: `Welcome, ${username}. You have successfully logged in!` });
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            this.props.navigate('/Home');
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
                <h1>Login</h1>
                <form className="signup-form" onSubmit={this.handleSubmit}>
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
                    <button type="submit">Login</button>
                </form>
                {this.state.message && <p>{this.state.message}</p>}
                <button onClick={() => this.props.navigate('/')} className="back-button">
                   Return
                </button>
            </div>
        );
    }
}

const LoginWithNavigate = () => {
    const navigate = useNavigate();
    return <Login navigate={navigate} />;
};

export default LoginWithNavigate;
