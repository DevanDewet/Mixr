
import React from 'react';
import Comment from './Comment'; 
import './CommentList.css'; 

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
