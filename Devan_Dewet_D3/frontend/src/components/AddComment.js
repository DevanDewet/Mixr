
import React from 'react';
import './AddComment.css'; 

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            image: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
    }

    render() {
        const { text, image } = this.state;

        return (
            <form className="add-comment" onSubmit={this.handleSubmit}>
                <h3>Add a Comment</h3>
                <textarea name="text" value={text} onChange={this.handleChange} placeholder="Write your comment here..."></textarea>
                <label>
                    Image URL:
                    <input type="text" name="image" value={image} onChange={this.handleChange} />
                </label>
                <button type="submit">Post Comment</button>
            </form>
        );
    }
}

export default AddComment;
