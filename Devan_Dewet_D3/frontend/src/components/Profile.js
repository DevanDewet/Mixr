import React, { useEffect, useState } from 'react';
import '../css/profile.css'; 

const Profile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

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
