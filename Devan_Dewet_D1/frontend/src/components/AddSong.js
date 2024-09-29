import React from 'react';
import '../css/songfeed.css';
import '../css/addSong.css'; 

class AddSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false, 
            coverImage: '',
            title: '',
            artist: '',
            album: '',
            duration: ''
        };
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm }); // Toggle form visibility
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { coverImage, title, artist, album, duration } = this.state;

        // Call parent component's function to add the new song
        this.props.onAddSong({
            coverImage,
            title,
            artist,
            album,
            duration
        });

        // Reset the form and hide it
        this.setState({
            showForm: false,
            coverImage: '',
            title: '',
            artist: '',
            album: '',
            duration: ''
        });
    };

    render() {
        return (
            <>
                <button className="open-form-button" onClick={this.toggleForm}>
                    Add Song
                </button>

                {this.state.showForm && (
                    <div className="form-overlay">
                        <div className="add-song-form">
                            <h2>Add a New Song</h2>
                            <form className="add-form" onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Cover Image URL:</label>
                                    <input
                                        type="text"
                                        name="coverImage"
                                        value={this.state.coverImage}
                                        onChange={this.handleChange}
                                        placeholder="Enter cover image URL"
                                    />
                                </div>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder="Enter song title"
                                    />
                                </div>
                                <div>
                                    <label>Artist:</label>
                                    <input
                                        type="text"
                                        name="artist"
                                        value={this.state.artist}
                                        onChange={this.handleChange}
                                        placeholder="Enter artist name"
                                    />
                                </div>
                                <div>
                                    <label>Album:</label>
                                    <input
                                        type="text"
                                        name="album"
                                        value={this.state.album}
                                        onChange={this.handleChange}
                                        placeholder="Enter album name"
                                    />
                                </div>
                                <div>
                                    <label>Duration:</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={this.state.duration}
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

export default AddSong;
