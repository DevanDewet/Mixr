import React from 'react';
import '../css/createplaylist.css'; // Include your styles here

class CreatePlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            name: '',
            genre: '',
            shortDescription: '',
            coverImage: '',
            hashtags: '',
            genres: [] // State to hold the genres
        };
    }

    componentDidMount() {
        this.fetchGenres();
    }

    fetchGenres = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/genre/genres');
            if (!response.ok) {
                throw new Error('Failed to fetch genres');
            }
            const genres = await response.json();
            this.setState({ genres }); // Store genres in state
        } catch (error) {
            console.error('Error fetching genres:', error.message);
        }
    };

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { name, genre, shortDescription, coverImage, hashtags } = this.state;

        const createdBy = localStorage.getItem('userId');

        const newPlaylist = {
            name,
            genre,
            shortDescription,
            coverImage,
            hashtags: hashtags.split(',').map(tag => tag.trim()),
            createdBy,
        };

        try {
            const response = await fetch('http://localhost:5000/api/playlists/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlaylist),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to create playlist: ${errorData.message}`);
            }

            const data = await response.json();
            this.props.onCreate(data);

            this.setState({
                showForm: false,
                name: '',
                genre: '',
                shortDescription: '',
                coverImage: '',
                hashtags: ''
            });
        } catch (error) {
            console.error('Error creating playlist:', error.message);
        }
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
                                    <label>Genre:</label>
                                    <select
                                        name="genre"
                                        value={this.state.genre}
                                        onChange={this.handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select a genre</option>
                                        {this.state.genres.map((genre) => (
                                            <option key={genre} value={genre}>
                                                {genre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <textarea
                                        name="shortDescription"
                                        value={this.state.shortDescription}
                                        onChange={this.handleChange}
                                        placeholder="Enter playlist description"
                                        required
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
                                    <label>Hashtags:</label>
                                    <input
                                        type="text"
                                        name="hashtags"
                                        value={this.state.hashtags}
                                        onChange={this.handleChange}
                                        placeholder="Enter hashtags, separated by commas"
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
