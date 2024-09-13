import React from 'react';
import '../css/editProfile.css';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            name: this.props.profile.name || '',
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

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, bio, profilePicture } = this.state;
        
        if (this.props.onUpdateProfile) {
            this.props.onUpdateProfile({
                name,
                email,
                bio,
                profilePicture
            });
        }

        this.setState({
            showForm: false,
            name: '',
            email: '',
            bio: '',
            profilePicture: ''
        });
    };

    render() {
        return (
            <>
                <button className="open-form-button" onClick={this.toggleForm}>
                    Edit Profile
                </button>

                {this.state.showForm && (
                    <div className="form-overlay">
                        <div className="edit-profile-form">
                            <h2>Edit Profile</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder="Enter your name"
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
                                <button type="button" onClick={this.toggleForm}>
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
