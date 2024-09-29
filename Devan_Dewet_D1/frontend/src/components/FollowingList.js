// FollowingList.js
import React from 'react';
import ProfilePreview from './ProfilePreview';
import '../css/followinglist.css'; // Add your styling here

const FollowingList = ({ following, onActionClick }) => {
    return (
        <div className="following-list">
            <h2>Following</h2>
            {following.length > 0 ? (
                following.map(user => (
                    <ProfilePreview key={user.id} user={user} onActionClick={onActionClick} />
                ))
            ) : (
                <p>Not following anyone yet.</p>
            )}
        </div>
    );
};

export default FollowingList;
