import React from 'react';

class AddSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false, 
            coverImage: '',
            title: '',
            artist: '',
            album: '',
            duration: '',
            link: '' 
        };
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { coverImage, title, artist, album, duration, link } = this.state; 
    
        const newSong = {
            coverImage,
            title,
            artist,
            album,
            duration,
            link,
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/songs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add song');
            }
    
          
            const addedSong = await response.json();
            this.props.onAddSong(addedSong); 
    
            this.setState({
                showForm: false,
                coverImage: '',
                title: '',
                artist: '',
                album: '',
                duration: '',
                link: '' 
            });
        } catch (error) {
            console.error('Error adding song:', error.message);
        }
    };

    render() {
        const modalStyle = {
            backgroundColor: '#4a4a4a',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            maxWidth: '400px',
            margin: '0 auto',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
        };

        const overlayStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 999
        };

        return (
            <>
                <button 
                    className="add-song-btn" 
                    onClick={this.toggleForm}
                    style={{ 
                       color:'white'
                    }}
                >
                    Add Song
                </button>

                {this.state.showForm && (
                    <>
                        <div style={overlayStyle} onClick={this.toggleForm}></div>
                        <div className="modal-content" style={modalStyle}>
                            <h2 className="modal-title">Add a New Song</h2>
                            <form className="add-song-form" onSubmit={this.handleSubmit}>
                                <div>
                                    <label className="form-label">Cover Image URL:</label>
                                    <input
                                        type="text"
                                        name="coverImage"
                                        value={this.state.coverImage}
                                        onChange={this.handleChange}
                                        placeholder="Enter cover image URL"
                                        className="form-input"
                                        style={{ 
                                            marginBottom: '10px', 
                                            width: '100%', 
                                            padding: '10px', 
                                            borderRadius: '4px', 
                                            border: '1px solid #ccc', 
                                            color: 'black'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder="Enter song title"
                                        className="form-input"
                                        style={{ 
                                            marginBottom: '10px', 
                                            width: '100%', 
                                            padding: '10px', 
                                            borderRadius: '4px', 
                                            border: '1px solid #ccc', 
                                            color: 'black'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Artist:</label>
                                    <input
                                        type="text"
                                        name="artist"
                                        value={this.state.artist}
                                        onChange={this.handleChange}
                                        placeholder="Enter artist name"
                                        className="form-input"
                                        style={{ 
                                            marginBottom: '10px', 
                                            width: '100%', 
                                            padding: '10px', 
                                            borderRadius: '4px', 
                                            border: '1px solid #ccc', 
                                            color: 'black'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Album:</label>
                                    <input
                                        type="text"
                                        name="album"
                                        value={this.state.album}
                                        onChange={this.handleChange}
                                        placeholder="Enter album name"
                                        className="form-input"
                                        style={{ 
                                            marginBottom: '10px', 
                                            width: '100%', 
                                            padding: '10px', 
                                            borderRadius: '4px', 
                                            border: '1px solid #ccc', 
                                            color: 'black'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Duration:</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={this.state.duration}
                                        onChange={this.handleChange}
                                        placeholder="Enter duration (e.g., 3:45)"
                                        className="form-input"
                                        style={{ 
                                            marginBottom: '10px', 
                                            width: '100%', 
                                            padding: '10px', 
                                            borderRadius: '4px', 
                                            border: '1px solid #ccc', 
                                            color: 'black'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Link:</label>
                                    <input
                                        type="text"
                                        name="link" 
                                        value={this.state.link} 
                                        onChange={this.handleChange} 
                                        placeholder="Enter song link"
                                        className="form-input"
                                        style={{ 
                                            marginBottom: '10px', 
                                            width: '100%', 
                                            padding: '10px', 
                                            borderRadius: '4px', 
                                            border: '1px solid #ccc', 
                                            color: 'black'
                                        }}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="submit-btn"
                                    style={{ 
                                        marginTop: '10px', 
                                        padding: '10px 20px', 
                                        borderRadius: '4px', 
                                        border: 'none', 
                                        color: 'white',
                                        marginRight: '10px'
                                    }}
                                >
                                    Submit
                                </button>
                                <button 
                                    type="button" 
                                    onClick={this.toggleForm} 
                                    className="cancel-btn"
                                    style={{ 
                                        marginTop: '10px', 
                                        padding: '10px 20px', 
                                        borderRadius: '4px', 
                                        border: 'none', 
                                        color: 'white' 
                                    }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default AddSong;
