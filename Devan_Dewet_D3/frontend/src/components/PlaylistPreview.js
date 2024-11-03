import React from 'react';
import EditPlaylist from './EditPlaylist'; 
import AddSongToPlaylist from './AddSongToPlaylist'; 

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

    handleDeletePlaylist = () => {
        const { playlist, onDeletePlaylist } = this.props;
        if (window.confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
            onDeletePlaylist(playlist._id);
        }
        this.setState({ showDropdown: false });
    };

    handleCloseForm = () => {
        this.setState({ editing: false, addingSong: false });
    };

    render() {
        const { playlist, onEditPlaylist } = this.props;
        const { showDropdown, editing, addingSong } = this.state;

        const playlistCardStyle = {
            backgroundColor: '#4a4a4a',
            color: 'white',
            border: '1px solid #6c757d',
            marginBottom: '10px',
            borderRadius: '0.5rem',
            padding: '10px',
            marginLeft: '5px',
            position: 'relative', 
        };

        const coverStyle = {
            borderRadius: '0.5rem 0.5rem 0 0',
            width: '100%',
            height: 'auto',
        };

        const buttonStyle = {
            backgroundColor: '#b0b0b0',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '0.3rem',
            cursor: 'pointer',
            marginTop: '10px',
        };

        return (
            <div style={playlistCardStyle}>
                <img src={playlist.coverImage} alt={playlist.name} style={coverStyle} />
                <h3>{playlist.name}</h3>
                <p>{playlist.shortDescription}</p>
                <span>{playlist.genre}</span>
                <div className="hashtags">
                    {playlist.hashtags && playlist.hashtags.length > 0 && (
                        playlist.hashtags.map((tag) => (
                            <span key={tag} className="badge" style={{ margin: '5px', backgroundColor: '#b0b0b0', color: 'white' }}>{tag}</span>
                        ))
                    )}
                </div>

                <div className="mt-2">
                    <button style={buttonStyle} onClick={this.toggleDropdown}>
                        Options
                    </button>

                    {showDropdown && (
                        <div style={{ position: 'absolute', backgroundColor: '#343a40', borderRadius: '0.3rem', marginTop: '5px', padding: '5px' }}>
                            <button className="dropdown-item" style={buttonStyle} onClick={this.handleEditPlaylist}>Edit Playlist</button>
                            <button className="dropdown-item" style={buttonStyle} onClick={this.handleAddSong}>Add Song to Playlist</button>
                            <button className="dropdown-item" style={buttonStyle} onClick={this.handleDeletePlaylist}>Delete Playlist</button>
                        </div>
                    )}
                </div>

                {editing && (
                    <EditPlaylist
                        playlist={playlist}
                        onEditPlaylist={this.props.onEditPlaylist}
                        onClose={this.handleCloseForm}
                    />
                )}
            </div>
        );
    }
}

export default PlaylistPreview;
