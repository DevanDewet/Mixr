import React, { useState, useEffect } from 'react';
import '../css/AdminDashboard.css';
import EditProfile from '../components/EditProfile';
import EditSong from '../components/EditSong';

const AdminDashboard = () => {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [users, setUsers] = useState([]);
    const [songs, setSongs] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        fetchGenres();
        fetchUsers();
        fetchSongs();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/genre/genres');
            if (!response.ok) throw new Error('Failed to fetch genres');
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error('Error fetching genres:', error.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    const fetchSongs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/songs');
            if (!response.ok) throw new Error('Failed to fetch songs');
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.error('Error fetching songs:', error.message);
        }
    };

    const handleAddGenre = async (event) => {
        event.preventDefault();
        if (!newGenre) return;
        try {
            const response = await fetch('http://localhost:5000/api/genre/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newGenre }),
            });
            if (!response.ok) throw new Error('Failed to add genre');
            setNewGenre('');
            fetchGenres();
        } catch (error) {
            console.error('Error adding genre:', error.message);
        }
    };

    const handleRemoveGenre = async (genre) => {
        try {
            const response = await fetch(`http://localhost:5000/api/genre/remove/${genre}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to remove genre');
            fetchGenres();
        } catch (error) {
            console.error('Error removing genre:', error.message);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    const handleSaveProfile = async (updatedProfile) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProfile),
            });
            if (!response.ok) throw new Error('Failed to update profile');
            fetchUsers();
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to remove user');
            fetchUsers();
        } catch (error) {
            console.error('Error removing user:', error.message);
        }
    };

    const handleEditSong = (song) => {
        setSelectedSong(song);
    };

    const handleRemoveSong = async (songId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/songs/${songId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to remove song');
            fetchSongs();
        } catch (error) {
            console.error('Error removing song:', error.message);
        }
    };

    const handleUpdateSong = async (updatedSong) => {
        try {
            const response = await fetch(`http://localhost:5000/api/songs/${updatedSong._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSong),
            });
            if (!response.ok) throw new Error('Failed to update song');
            fetchSongs();
            setSelectedSong(null);
        } catch (error) {
            console.error('Error updating song:', error.message);
        }
    };

    // Inline styles for song-related elements
    const songItemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        margin: '10px 0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '10px',
    };

    return (
        <div className="admin-dashboard-container">
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleAddGenre} className="genre-form">
                <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Add a new genre"
                    required
                    className="genre-input"
                />
                <button type="submit" className="add-genre-button">Add Genre</button>
            </form>
            <h3>Current Genres</h3>
            <ul className="genre-list">
                {genres.map((genre) => (
                    <li key={genre} className="genre-item">
                        {genre}
                        <button onClick={() => handleRemoveGenre(genre)} className="remove-genre-button">Remove</button>
                    </li>
                ))}
            </ul>

            <h3>Profiles</h3>
            <div className="user-list-container">
                <div className="user-list">
                    {users.map((user) => (
                        <div key={user._id} className="user-item">
                            <span>{user.username}</span>
                            <button onClick={() => handleEditClick(user)} className="edit-user-button">Edit</button>
                            <button onClick={() => handleRemoveUser(user._id)} className="remove-user-button">Delete</button>
                        </div>
                    ))}
                </div>
            </div>

            {selectedUser && (
                <EditProfile
                    profile={selectedUser}
                    onUpdateProfile={handleSaveProfile}
                    onCancel={() => setSelectedUser(null)}
                />
            )}

            <h3>Songs</h3>
            <div className="song-list-container">
                {songs.map((song) => (
                    <div key={song._id} style={songItemStyle}>
                        <span>{song.title}</span>
                        <div style={buttonContainerStyle}>
                            <button onClick={() => handleEditSong(song)} className="edit-song-button">Edit</button>
                            <button onClick={() => handleRemoveSong(song._id)} className="remove-song-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedSong && (
                <EditSong
                    song={selectedSong}
                    onUpdateSong={handleUpdateSong}
                    onCancel={() => setSelectedSong(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
