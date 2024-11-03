import React from 'react';
import ProfilePreview from './ProfilePreview';
import '../css/followinglist.css'; 

const FollowingList = ({ following, onActionClick }) => {
    return (
        <div className="following-list" style={{ backgroundColor: 'transparent' }}>
            <h2>Following</h2>
            <div className="scrollable-list">
                {following.length > 0 ? (
                    following.map(user => (
                        <ProfilePreview key={user.id} user={user} onActionClick={onActionClick} />
                    ))
                ) : (
                    <p>Not following anyone yet.</p>
                )}
            </div>
        </div>
    );
};

export default FollowingList;
