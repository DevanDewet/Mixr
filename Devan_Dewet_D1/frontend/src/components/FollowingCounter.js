// FollowingCounter.js
import React from 'react';
import '../css/counter.css'; // Add your styling here

const FollowingCounter = ({ count }) => {
    return (
        <div className="counter">
            <h3>Following</h3>
            <p>{count}</p>
        </div>
    );
};

export default FollowingCounter;
