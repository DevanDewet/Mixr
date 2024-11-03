import React from 'react';
import { FaTrash } from 'react-icons/fa'; 
import '../css/song.css'; 

class Song extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
            coverImage: props.coverImage,
            title: props.title,
            artist: props.artist,
            album: props.album,
            duration: props.duration,
            songId: props.songId,
            link: props.link 
        };
    }

    handleDelete = () => {
        this.props.onDelete(this.state.songId);
    };

    render() {
        const { coverImage, title, artist, album, duration, link } = this.state;

        return (
            <div className="song-container">
                <div className="row align-items-center">
                    <div className="col-2">
                        <img src={coverImage} alt={`${title} cover`} className="img-fluid song-cover" />
                    </div>
                    <div className="col-4">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="song-title">
                            {title}
                        </a>
                        <div className="song-artist">{artist}</div>
                    </div>
                    <div className="col-4 song-album">
                        {album}
                    </div>
                    <div className="col-2 song-duration d-flex align-items-center justify-content-between">
                        <span>{duration}</span>
                        <FaTrash className="delete-icon" onClick={this.handleDelete} style={{ cursor: 'pointer', color: '#AA4A44' }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Song;
