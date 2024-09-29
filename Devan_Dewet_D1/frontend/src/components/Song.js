import React from 'react';
import '../css/song.css'; 

class Song extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            coverImage: props.coverImage,
            title: props.title,
            artist: props.artist,
            album: props.album,
            duration: props.duration
        };
    }

    render() {
        const { coverImage, title, artist, album, duration } = this.state;

        return (
            <div className="song-container">
                <img src={coverImage} alt={`${title} cover`} className="song-cover" />
                <div className="song-details">
                    <div className="song-title">
                        {title}
                    </div>
                    <div className="song-info">
                        <div className="song-artist">{artist}</div>
                        <div className="song-album">{album}</div>
                        <div className="song-duration">{duration}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Song;
