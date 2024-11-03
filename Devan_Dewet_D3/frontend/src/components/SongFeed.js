import React from 'react';
import Song from './Song';
import '../css/songfeed.css';
import AddSong from './AddSong';

class SongFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [] 
        };
    }

    componentDidMount() {
        this.fetchSongs(); 
    }

    fetchSongs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/songs'); 
            if (!response.ok) {
                throw new Error('Failed to fetch songs');
            }
            const data = await response.json();
            this.setState({ songs: data });
        } catch (error) {
            console.error('Error fetching songs:', error.message);
        }
    };  

    handleAddSong = async (newSong) => {
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

            this.setState(prevState => ({
                songs: [newSong, ...prevState.songs] 
            }));
            this.fetchSongs(); 
        } catch (error) {
            console.error('Error adding song:', error.message);
        }
    };

   


    handleDeleteSong = async (songId) => {
        console.log("Deleting song with ID:", songId); 
        if (!songId) {
            console.error("No song ID provided");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/songs/${songId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete song');
            }

         
            this.fetchSongs();
        } catch (error) {
            console.error('Error deleting song:', error.message);
        }
    };
    
    render() {
        const { songs } = this.state;

        return (
            <div className="container songfeed-container my-4">
                <h1 className="text-center mb-4">Song Feed</h1>
                <div className="row songfeed-header bg-light py-2">
                    <div className="col-2"></div>
                    <div className="col-4"><strong>Title</strong></div>
                    <div className="col-4"><strong>Album</strong></div>
                    <div className="col-2"><strong>Duration</strong></div>
                </div>
                <div className="song-list">
                    {songs.map((song, index) => (
                        <Song
                            key={index}
                            coverImage={song.coverImage}
                            title={song.title}
                            artist={song.artist}
                            album={song.album}
                            duration={song.duration}
                            songId={song._id} 
                            link={song.link}
                            onDelete={this.handleDeleteSong}
                        />
                    ))}
                </div>

                <AddSong onAddSong={this.handleAddSong} />
            </div>
        );
    }
}

export default SongFeed;
