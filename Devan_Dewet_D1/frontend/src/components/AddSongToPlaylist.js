import React from 'react';
import '../css/songfeed.css';
import '../css/addSong.css'; 

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
                duration: ''
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

        // For now, we'll just log the song and playlist details
        console.log('Adding song to playlist:', this.state.playlist, this.state.song);

        // Reset the form and hide it
        this.setState({
            showForm: false,
            playlist: '',
            song: {
                title: '',
                artist: '',
                album: '',
                duration: ''
            }
        });
    };

    render() {
        return (
            <>
                <button className="open-form-button" onClick={this.toggleForm}>
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
                                        <option value="Chill Vibes">Chill Vibes</option>
                                        <option value="Workout Hits">Workout Hits</option>
                                        <option value="Top 40">Top 40</option>
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
