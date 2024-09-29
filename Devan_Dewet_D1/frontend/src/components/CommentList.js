// src/components/CommentList.js
import React from 'react';
import Comment from './Comment'; // Ensure this component exists
import './CommentList.css'; // Import the CSS file for styling

class CommentList extends React.Component {
    render() {
        const { comments } = this.props;

        return (
            <div className="comment-list">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        );
    }
}

export default CommentList;
