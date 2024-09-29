import React from 'react';
import Song from './Song';
import '../css/songfeed.css';

import AddSong from './AddSong';

class SongFeed extends React.Component {

    handleAddSong = (newSong) => {
        this.setState((prevState) => ({
            songs: [...prevState.songs, newSong]
        }));
    };

    render() {
        const { songs } = this.props;

        return (
            <div className="songfeed-container">
                  <h1>Song Feed</h1>
                <div className="songfeed-header">
                    <div className="header-title">Title</div>
                    <div className="header-album">Album</div>
                    <div className="header-duration">Duration</div>
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
                        />
                    ))}
                
                </div>

                <AddSong onAddSong={this.handleAddSong} />
            </div>
        );
    }
}

export default SongFeed;
