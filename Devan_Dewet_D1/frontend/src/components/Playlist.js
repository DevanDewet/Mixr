// src/components/Playlist.js
import React from 'react';
import Song from './Song'; 
import './playlist.css'; 

class Playlist extends React.Component {
    render() {
        const { playlist } = this.props;

        return (
            <div className="playlist">
                <img src={playlist.coverImage} alt={playlist.name} className="cover-image" />
                <h1>{playlist.name}</h1>
                <p><strong>Genre:</strong> {playlist.genre}</p>
                <p><strong>Description:</strong> {playlist.shortDescription}</p>
                <p><strong>Hashtags:</strong> {playlist.hashtags.join(', ')}</p>
                
                <h2>Songs</h2>
                <div className="songs-list">
                    {playlist.songs.length > 0 ? (
                        playlist.songs.map(song => (
                            <Song key={song.id} song={song} />
                        ))
                    ) : (
                        <p>No songs in this playlist.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Playlist;
