// FollowersCounter.js
import React from 'react';
import '../css/counter.css'; // Add your styling here

const FollowersCounter = ({ count }) => {
    return (
        <div className="counter">
            <h3>Followers</h3>
            <p>{count}</p>
        </div>
    );
};

export default FollowersCounter;
