
import React from 'react';
import '../css/ProfilePreview.css'; 

const ProfilePreview = ({ user }) => {
    return (
        <div className="profile-preview-card">
            <img src={user.profilePicture} alt={user.name} className="profile-preview-picture" />
            <div className="profile-preview-info">
                <h3>{user.username}</h3>
                <p>{user.bio}</p>
            </div>
        </div>
    );
};

export default ProfilePreview;
