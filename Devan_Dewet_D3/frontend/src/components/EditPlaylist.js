import React from 'react';
import '../css/EditPlaylist.css'; // Include your styles here

class EditPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            name: this.props.playlist.name || '',
            category: this.props.playlist.category || '',
            description: this.props.playlist.description || '',
            coverImage: this.props.playlist.coverImage || '',
            genre: this.props.playlist.genre || '',
            hashtags: this.props.playlist.hashtags || ''
        };
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, category, description, coverImage, genre, hashtags } = this.state;

        // Call parent component's function to update the playlist
        this.props.onEditPlaylist({
            _id: this.props.playlist._id,
            name,
            category,
            description,
            coverImage,
            genre,
            hashtags
        });

        // Hide the form after submitting
        this.setState({ showForm: false });
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
                    Edit Playlist
                </button>

                {this.state.showForm && (
                    <div className="form-overlay">
                        <div className="edit-playlist-form">
                            <h2>Edit Playlist</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Playlist Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder="Enter playlist name"
                                    />
                                </div>
                                <div>
                                    <label>Category:</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        placeholder="Enter category"
                                    />
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <textarea
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        placeholder="Enter playlist description"
                                    />
                                </div>
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
                                    <label>Genre:</label>
                                    <select
                                        name="genre"
                                        value={this.state.genre}
                                        onChange={this.handleChange}
                                    >
                                        <option value="pop">Pop</option>
                                        <option value="rock">Rock</option>
                                        <option value="hiphop">Hip-Hop</option>
                                        <option value="jazz">Jazz</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Hashtags:</label>
                                    <input
                                        type="text"
                                        name="hashtags"
                                        value={this.state.hashtags}
                                        onChange={this.handleChange}
                                        placeholder="Enter hashtags"
                                    />
                                </div>
                                <button type="submit">Save Changes</button>
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

export default EditPlaylist;
