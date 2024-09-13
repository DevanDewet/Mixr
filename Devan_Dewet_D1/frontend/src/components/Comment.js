// src/components/Comment.js
import React from 'react';
import './Comment.css'; // Import the CSS file for styling

class Comment extends React.Component {
    render() {
        const { comment } = this.props;

        return (
            <div className="comment">
                <img src={comment.userProfilePicture} alt={comment.userName} />
                <div className="comment-content">
                    <h4>{comment.userName}</h4>
                    <p>{comment.text}</p>
                </div>
                {comment.image && <img src={comment.image} alt="Comment attachment" />}
            </div>
        );
    }
}

export default Comment;
sd