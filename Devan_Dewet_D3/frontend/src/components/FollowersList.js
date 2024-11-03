import React from 'react';
import ProfilePreview from './ProfilePreview';
import '../css/followerslist.css'; 

const FollowersList = ({ followers, onActionClick }) => {
    return (
        <div className="followers-list" style={{ backgroundColor: 'transparent' }}>
            <h2>Followers</h2>
            <div className="scrollable-list">
                {followers.length > 0 ? (
                    followers.map(user => (
                        <ProfilePreview key={user.id} user={user} onActionClick={onActionClick} />
                    ))
                ) : (
                    <p>No followers yet.</p>
                )}
            </div>
        </div>
    );
};

export default FollowersList;
