import React from 'react';
import '../css/createplaylist.css'; // Include your styles here

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            name: '',
            category: '',
            description: '',
            coverImage: '',
            genre: '',
            hashtags: ''
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

       
        this.props.onAddPlaylist({
            name,
            category,
            description,
            coverImage,
            genre,
            hashtags
        });

        // Reset the form and hide it
        this.setState({
            showForm: false,
            name: '',
            category: '',
            description: '',
            coverImage: '',
            genre: '',
            hashtags: ''
        });
    };

    render() {
        return (
            <>
                <button className="open-form-button" onClick={this.toggleForm}>
                    Create Playlist
                </button>

                {this.state.showForm && (
                    <div className="form-overlay">
                        <div className="create-playlist-form">
                            <h2>Create a New Playlist</h2>
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

export default CreatePlaylist;
