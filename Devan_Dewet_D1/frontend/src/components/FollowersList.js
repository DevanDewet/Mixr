// FollowersList.js
import React from 'react';
import ProfilePreview from './ProfilePreview';
import '../css/followerslist.css'; // Add your styling here

const FollowersList = ({ followers, onActionClick }) => {
    return (
        <div className="followers-list">
            <h2>Followers</h2>
            {followers.length > 0 ? (
                followers.map(user => (
                    <ProfilePreview key={user.id} user={user} onActionClick={onActionClick} />
                ))
            ) : (
                <p>No followers yet.</p>
            )}
        </div>
    );
};

export default FollowersList;
