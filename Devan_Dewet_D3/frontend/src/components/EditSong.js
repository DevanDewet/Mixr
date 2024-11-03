import React from 'react';
import '../css/EditSong.css'; 

class EditSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            coverImage: this.props.song.coverImage || '',
            title: this.props.song.title || '',
            artist: this.props.song.artist || '',
            album: this.props.song.album || '',
            duration: this.props.song.duration || '',
            link: this.props.song.link || '', 
            isHovered: false,
        };
    }

    
    componentDidUpdate(prevProps) {
        if (prevProps.song !== this.props.song) {
            const { coverImage, title, artist, album, duration, link } = this.props.song;
            this.setState({
                coverImage,
                title,
                artist,
                album,
                duration,
                link, 
                showForm: false, 
            });
        }
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
        const { coverImage, title, artist, album, duration, link } = this.state;

        
        this.props.onUpdateSong({
            _id: this.props.song._id, 
            coverImage,
            title,
            artist,
            album,
            duration,
            link 
        });

        
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
                    Edit Song
                </button>

                {this.state.showForm && (
                    <div className="form-overlay">
                        <div className="edit-song-form">
                            <h2>Edit Song</h2>
                            <form onSubmit={this.handleSubmit}>
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
                                        placeholder="Enter duration (e.g., 3:32)"
                                    />
                                </div>
                                <div>
                                    <label>Link:</label> 
                                    <input
                                        type="text"
                                        name="link"
                                        value={this.state.link}
                                        onChange={this.handleChange}
                                        placeholder="Enter song link URL"
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

export default EditSong;

