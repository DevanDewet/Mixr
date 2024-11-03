import React from 'react';
import { useNavigate } from 'react-router-dom';

class Logout extends React.Component {
    handleLogout = () => {
        // Call the logout API
        fetch('http://localhost:5000/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed. Please try again.');
            }
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
           
            this.props.navigate('/LogIn');
        })
        .catch(error => {
            console.error('Error:', error);
          
        });
    };

    render() {
        return (
            <button onClick={this.handleLogout} style={{ 
                color:'white',
                margin:'15px'
             }}>
                Logout
            </button>
        );
    }
}

const LogoutWrapper = () => {
    const navigate = useNavigate();
    return <Logout navigate={navigate} />;
};

export default LogoutWrapper;
