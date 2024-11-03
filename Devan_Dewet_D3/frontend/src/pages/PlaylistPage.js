import React from 'react';
import PlaylistPreview from '../components/PlaylistPreview'; 
import Navigation from '../components/Navigation';
import CreatePlaylist from '../components/CreatePlaylist'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/PlaylistPage.css';
import Search from '../components/Search';
import AddSongToPlaylist from '../components/AddSongToPlaylist';

class PlaylistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            showCreateForm: false,
            loading: true, 
            error: null, 
            activePlaylistId: null, 
        };
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId'); 
        if (userId) {
            this.fetchUserPlaylists(userId);
        } else {
            console.error("User ID not found in localStorage");
        }
    }

    fetchUserPlaylists = (userId) => {
        fetch(`http://localhost:5000/api/playlists/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ playlists: data, loading: false });
            })
            .catch(error => {
                console.error('Error fetching user playlists:', error);
                this.setState({ loading: false, error: error.message });
            });
    }

    toggleCreateForm = () => {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    addNewPlaylist = (newPlaylist) => {
        console.log("New Playlist:", newPlaylist);
        const userId = localStorage.getItem('userId');
        this.fetchUserPlaylists(userId);
    }

    handleEditPlaylist = (updatedPlaylist) => {
        console.log("Updated Playlist:", updatedPlaylist);
        
        fetch(`http://localhost:5000/api/playlists/${updatedPlaylist._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPlaylist),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update playlist');
            }
            this.setState(prevState => ({
                playlists: prevState.playlists.map(playlist => 
                    playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
                )
            }));
        })
        .catch(error => {
            console.error('Error updating playlist:', error);
        });
    };

    handleAddSongToPlaylist = (newSong) => {
        const { activePlaylistId } = this.state;
        if (!activePlaylistId) {
            console.error('No active playlist to add the song to.');
            return;
        }

        fetch(`http://localhost:5000/api/playlists/${activePlaylistId}/songs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSong),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add song to playlist');
            }
            return response.json();
        })
        .then(data => {
            console.log('Song added to playlist:', data);
            this.fetchUserPlaylists(localStorage.getItem('userId')); 
        })
        .catch(error => {
            console.error('Error adding song to playlist:', error);
        });
    };

    handleDeletePlaylist = (playlistId) => {
        fetch(`http://localhost:5000/api/playlists/${playlistId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete playlist');
            }
            this.setState(prevState => ({
                playlists: prevState.playlists.filter(playlist => playlist._id !== playlistId)
            }));
            console.log('Playlist deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting playlist:', error);
        });
    };

    render() {
        const { playlists, loading, error } = this.state;
    
        return (
            <div className="playlist-page">
                <Navigation />
                <Search type="playlists" />
                <h1>My Playlists</h1>
                <div className="playlist-grid">
                    {loading ? (
                        <p>Loading playlists...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : playlists.length > 0 ? (
                        playlists.map((playlist) => (
                            <div key={playlist._id}>
                                <PlaylistPreview
                                    playlist={playlist}
                                    onEditPlaylist={this.handleEditPlaylist}
                                    onDeletePlaylist={this.handleDeletePlaylist}
                                    onAddSong={() => this.setState({ activePlaylistId: playlist._id })} 
                                />
                                <AddSongToPlaylist 
                                    playlists={playlists} 
                                    onAddSongToPlaylist={this.handleAddSongToPlaylist} 
                                />
                            </div>
                        ))
                    ) : (
                        <p>No playlists found</p>
                    )}
                </div>
                <CreatePlaylist
                    show={this.state.showCreateForm}
                    onClose={this.toggleCreateForm}
                    onCreate={this.addNewPlaylist}
                />
            </div>
        );
    }
}

export default PlaylistPage;
