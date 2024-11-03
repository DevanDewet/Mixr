
import React from 'react';
import '../css/counter.css'; 

const FollowingCounter = ({ count }) => {
    return (
        <div className="counter">
            <h3>Following</h3>
            <p>{count}</p>
        </div>
    );
};

export default FollowingCounter;
