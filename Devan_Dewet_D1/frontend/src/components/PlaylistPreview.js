import React, { useState } from 'react';
import EditPlaylist from './EditPlaylist'; // Import EditPlaylist component
import AddSongToPlaylist from './AddSongToPlaylist'; // Import AddSongToPlaylist component
import '../css/PlaylistPreview.css'; // Import your styling for each preview

class PlaylistPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
            editing: false,
            addingSong: false
        };
    }

    toggleDropdown = () => {
        this.setState(prevState => ({ showDropdown: !prevState.showDropdown }));
    };

    handleEditPlaylist = () => {
        this.setState({ editing: true, showDropdown: false });
    };

    handleAddSong = () => {
        this.setState({ addingSong: true, showDropdown: false });
    };

    handleCloseForm = () => {
        this.setState({ editing: false, addingSong: false });
    };

    render() {
        const { playlist } = this.props;
        const { showDropdown, editing, addingSong } = this.state;

        return (
            <div className="playlist-card">
                <img src={playlist.coverImage} alt={playlist.name} className="playlist-cover" />
                <h3>{playlist.name}</h3>
                <p>{playlist.shortDescription}</p>
                <span className="playlist-genre">{playlist.genre}</span>
                <div className="hashtags">
                    {playlist.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">{tag}</span>
                    ))}
                </div>

                {/* Options Icon */}
                <div className="options-menu">
                    <button className="options-button" onClick={this.toggleDropdown}>
                        &#x22EE; {/* Three vertical dots */}
                    </button>

                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={this.handleEditPlaylist}>Edit Playlist</button>
                            <button onClick={this.handleAddSong}>Add Song to Playlist</button>
                        </div>
                    )}
                </div>

                {/* Render EditPlaylist form if editing */}
                {editing && (
                    <EditPlaylist
                        playlist={playlist}
                        onClose={this.handleCloseForm}
                    />
                )}

                {/* Render AddSongToPlaylist form if adding song */}
                {addingSong && (
                    <AddSongToPlaylist
                        playlistId={playlist.id}
                        onClose={this.handleCloseForm}
                    />
                )}
            </div>
        );
    }
}

export default PlaylistPreview;
