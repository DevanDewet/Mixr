import React from 'react';
import '../css/editprofile.css';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            username: this.props.profile.username || '',
            email: this.props.profile.email || '',
            bio: this.props.profile.bio || '',
            profilePicture: this.props.profile.profilePicture || ''
        };
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleCancel = () => {
        this.setState({
            showForm: false,
            username: this.props.profile.username || '',
            email: this.props.profile.email || '',
            bio: this.props.profile.bio || '',
            profilePicture: this.props.profile.profilePicture || ''
        });
    };
    

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, email, bio, profilePicture } = this.state;

        if (this.props.onUpdateProfile) {
            this.props.onUpdateProfile({
                username,
                email,
                bio,
                profilePicture
            });
        }

        this.setState({
            showForm: false,
        });
    };

    render() {
        const buttonStyle = {
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: this.state.isHovered ? '#8f8f89' : '#5f5f5b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        };
        return (
            <>
                <button
                    style={buttonStyle}
                    onClick={this.toggleForm}
                    onMouseEnter={() => this.setState({ isHovered: true })}
                    onMouseLeave={() => this.setState({ isHovered: false })}
                >
                    Edit Profile
                </button>

                {this.state.showForm && (
                    <div className="form-overlay">
                        <div className="edit-profile-form">
                            <h2>Edit Profile</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <label>Bio:</label>
                                    <textarea
                                        name="bio"
                                        value={this.state.bio}
                                        onChange={this.handleChange}
                                        placeholder="Enter a short bio"
                                    />
                                </div>
                                <div>
                                    <label>Profile Picture URL:</label>
                                    <input
                                        type="text"
                                        name="profilePicture"
                                        value={this.state.profilePicture}
                                        onChange={this.handleChange}
                                        placeholder="Enter profile picture URL"
                                    />
                                </div>
                                <button type="submit">Save</button>
                                <button type="button" onClick={this.handleCancel}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default EditProfile;
