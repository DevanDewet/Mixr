import React from 'react';

//components
import PlaylistPreview from '../components/PlaylistPreview'; 
import Navigation from '../components/Navigation';
import CreatePlaylist from '../components/CreatePlaylist'; 

import '../css/PlaylistPage.css';


class PlaylistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [
                {
                    name: 'Chill Vibes',
                    genre: 'Lo-fi',
                    shortDescription: 'Relax and unwind with these chill beats.',
                    coverImage: 'https://via.placeholder.com/150',
                    hashtags: ['#chill', '#lofi', '#relax'],
                },
                {
                    name: 'Rock Classics',
                    genre: 'Rock',
                    shortDescription: 'The best of rock from the 70s and 80s.',
                    coverImage: 'https://via.placeholder.com/150',
                    hashtags: ['#rock', '#classics', '#70s', '#80s'],
                },
                {
                    name: 'Top Pop Hits',
                    genre: 'Pop',
                    shortDescription: 'The latest and greatest pop hits.',
                    coverImage: 'https://via.placeholder.com/150',
                    hashtags: ['#pop', '#hits', '#2024'],
                },
                {
                    name: 'Jazz Evening',
                    genre: 'Jazz',
                    shortDescription: 'Smooth and soulful jazz for a relaxing evening.',
                    coverImage: 'https://via.placeholder.com/150',
                    hashtags: ['#jazz', '#smooth', '#evening'],
                },
              
            ] ,
            showCreateForm: false
        };
    }

    toggleCreateForm = () => {
      this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    addNewPlaylist = (newPlaylist) => {
        this.setState({
            playlists: [...this.state.playlists, newPlaylist]
        });
    }

    handleEditPlaylist = (updatedPlaylist) => {
      // Logic to update the playlist (e.g., send to backend or update state)
      console.log("Updated Playlist:", updatedPlaylist);
  };

    handleAddSongToPlaylist = (playlistId, newSong) => {
        // Logic to add a song to the playlist
        console.log(`Add song to Playlist ${playlistId}:`, newSong);
    };
    render() {
        return (
            <div className="playlist-page">
              <Navigation />
                <h1>My Playlists</h1>
                <div className="playlist-grid">
                    {this.state.playlists.map((playlist, index) => (
                        <PlaylistPreview
                        key={playlist.id}
                        playlist={playlist}
                        onEditPlaylist={this.handleEditPlaylist}
                        onAddSongToPlaylist={this.handleAddSongToPlaylist}
                    />
                    ))}
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
