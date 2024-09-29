// Profile.js
import React from 'react';
import '../css/profile.css'; // Add your styling here

const Profile = ({ user }) => {
    return (
        <div className="profile-container">
            <img src={user.profilePicture} alt={user.name} className="profile-picture" />
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.bio}</p>
        </div>
    );
};

export default Profile;
