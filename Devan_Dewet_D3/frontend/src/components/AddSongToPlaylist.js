import React from 'react';
import '../css/songfeed.css';
import '../css/addSongToPlaylist.css';

class AddSongToPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            playlist: '',
            song: {
                title: '',
                artist: '',
                album: '',
                duration: '',
                createdAt: new Date().toISOString(), 
                link: '', 
            }
        };
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'playlist') {
            this.setState({ playlist: value });
        } else {
            this.setState({
                song: {
                    ...this.state.song,
                    [name]: value
                }
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { playlist, song } = this.state;
    
        if (!playlist) {
            console.error('No playlist selected');
            return;
        }
    
        console.log('Adding song to playlist:', playlist, song);
    
        fetch(`http://localhost:5000/api/playlists/${playlist}/songs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                title: song.title, 
                artist: song.artist, 
                album: song.album, 
                duration: song.duration, 
                createdAt: song.createdAt, 
                link: song.link 
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add song to playlist');
            }
            return response.json();
        })
        .then(data => {
            console.log('Song added successfully:', data);
            this.setState({
                showForm: false,
                playlist: '',
                song: { 
                    title: '', 
                    artist: '', 
                    album: '', 
                    duration: '', 
                    createdAt: new Date().toISOString(), 
                    link: '' 
                },
            });
        })
        .catch(error => {
            console.error('Error adding song to playlist:', error);
        });
    };

    render() {
        const buttonStyle = {
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: this.state.isHovered ? 'rgb(150, 150, 150)' : 'rgb(176, 176, 176)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        };

        return (
            <>
                <button
                    style={buttonStyle}
                    onClick={this.toggleForm}
                    onMouseEnter={() => this.setState({ isHovered: true })}
                    onMouseLeave={() => this.setState({ isHovered: false })}
                >
                    Add Song to Playlist
                </button>

                {this.state.showForm && (
                    <div className="form-overlay">
                        <div className="add-song-form">
                            <h2>Add a Song to Playlist</h2>
                            <form className="add-form" onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Select Playlist:</label>
                                    <select
                                        name="playlist"
                                        value={this.state.playlist}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Choose a playlist</option>
                                        {this.props.playlists.map(playlist => (
                                            <option key={playlist._id} value={playlist._id}>
                                                {playlist.name} - {playlist.shortDescription} ({playlist.genre})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Song Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={this.state.song.title}
                                        onChange={this.handleChange}
                                        placeholder="Enter song title"
                                    />
                                </div>
                                <div>
                                    <label>Artist:</label>
                                    <input
                                        type="text"
                                        name="artist"
                                        value={this.state.song.artist}
                                        onChange={this.handleChange}
                                        placeholder="Enter artist name"
                                    />
                                </div>
                                <div>
                                    <label>Album:</label>
                                    <input
                                        type="text"
                                        name="album"
                                        value={this.state.song.album}
                                        onChange={this.handleChange}
                                        placeholder="Enter album name"
                                    />
                                </div>
                                <div>
                                    <label>Duration:</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={this.state.song.duration}
                                        onChange={this.handleChange}
                                        placeholder="Enter duration (e.g., 3:45)"
                                    />
                                </div>
                                <div>
                                    <label>Link:</label>
                                    <input
                                        type="text"
                                        name="link"
                                        value={this.state.song.link}
                                        onChange={this.handleChange}
                                        placeholder="Enter song link"
                                    />
                                </div>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={this.toggleForm}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default AddSongToPlaylist;
