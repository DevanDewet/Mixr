import React from 'react';
import SongFeed from '../components/SongFeed'; 
import '../css/viewplaylist.css'; 

class ViewPlaylist extends React.Component {
    state = {
        playlist: null,
        songs: [],
    };

    componentDidMount() {
        this.fetchPlaylistDetails(); 
    }

    fetchPlaylistDetails = async () => {
        const playlistId = 'your-playlist-id'; 
        try {
            const response = await fetch(`http://localhost:5000/api/playlist/${playlistId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch playlist details');
            }
            const data = await response.json();
            this.setState({ playlist: data.playlist, songs: data.songs }); 
        } catch (error) {
            console.error('Error fetching playlist details:', error.message);
        }
    };

    render() {
        const { playlist, songs } = this.state;

        if (!playlist) {
            return <div>Loading...</div>; 
        }

        return (
            <div className="view-playlist">
                <h1>{playlist.name}</h1>
                <p>{playlist.description}</p>
                <p>Genre: {playlist.genre}</p>
                <p>Created by: {playlist.createdBy}</p>
                <p>Created on: {playlist.createdAt}</p>

                <h2>Songs</h2>
                <SongFeed songs={songs} /> 
            </div>
        );
    }
}

export default ViewPlaylist;
