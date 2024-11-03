import React from 'react';
import { Navigate } from 'react-router-dom';
import ProfilePreview from '../components/ProfilePreview';
import FollowersList from '../components/FollowersList';
import FollowingList from '../components/FollowingList';
import FollowersCounter from '../components/FollowersCounter';
import FollowingCounter from '../components/FollowingCounter';
import EditProfile from '../components/EditProfile';
import Navigation from '../components/Navigation';
import Search from '../components/Search';
import AdminDashboard from '../components/AdminDashboard';
import '../css/profilepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class ProfilePage extends React.Component {
    state = {
        user: null,
        followers: [],
        following: [],
        followersCount: 0,
        followingCount: 0,
        editingProfile: false,
        loading: true,
        error: null,
        isDeleted: false,
        deleteMessage: '',
        redirectToSplash: false,
    };

    componentDidMount() {
        this.fetchUserProfile();
        this.fetchFollowersAndFollowing();
    }

    handleUpdateProfile = async (updatedProfile) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${this.state.user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            this.fetchUserProfile();
            this.setState({ editingProfile: false });
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    fetchUserProfile = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            this.setState({ error: 'User ID not found. Please log in again.', loading: false });
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await response.json();
            this.setState({ user: data, loading: false });
        } catch (error) {
            console.error('Error fetching user profile:', error.message);
            this.setState({ error: error.message, loading: false });
        }
    };

    toggleEditProfile = () => {
        this.setState(prevState => ({ editingProfile: !prevState.editingProfile }));
    };

    fetchFollowersAndFollowing = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            this.setState({ error: 'User ID not found. Please log in again.' });
            return;
        }

        try {
            const followersResponse = await fetch(`http://localhost:5000/api/users/${userId}/followers`);
            const followingResponse = await fetch(`http://localhost:5000/api/users/${userId}/following`);

            if (!followersResponse.ok || !followingResponse.ok) {
                throw new Error('Failed to fetch followers or following');
            }

            const followers = await followersResponse.json();
            const following = await followingResponse.json();

            this.setState({
                followers,
                following,
                followersCount: followers.length,
                followingCount: following.length,
            });
        } catch (error) {
            console.error('Error fetching followers and following:', error.message);
            this.setState({ error: error.message });
        }
    };

    handleDeleteProfile = async () => {
        const userId = this.state.user._id;
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete profile');
            }

            localStorage.removeItem('userId');
            localStorage.removeItem('token');

            this.setState({
                isDeleted: true,
                deleteMessage: 'Your profile has been successfully deleted. Redirecting to home page...'
            });

            setTimeout(() => {
                this.setState({ redirectToSplash: true });
            }, 3000);

        } catch (error) {
            console.error('Error deleting profile:', error.message);
            this.setState({ error: 'Failed to delete profile. Please try again.' });
        }
    };

    render() {
        const { user, editingProfile, loading, error, isDeleted, deleteMessage, redirectToSplash } = this.state;

        if (redirectToSplash) {
            return <Navigate to="/" />;
        }

        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!user && !isDeleted) return <div>User not found. Please log in again.</div>;

        if (isDeleted) {
            return (
                <div className="delete-message">
                    <h2>{deleteMessage}</h2>
                </div>
            );
        }

        return (
            <div className="profile-page">
                <Navigation />
                <Search type="users" />
                <div className="profile-dashboard-container">
                 
                  <h2>Profile Preview</h2>
                    <div className="profile-preview-section">
                        <ProfilePreview user={user} />
                        <button onClick={this.toggleEditProfile} className="edit-profile-button">
                            {editingProfile ? 'Cancel' : 'Edit Profile'}
                        </button>
                        {editingProfile && (
                            <EditProfile
                                profile={user}
                                onUpdateProfile={this.handleUpdateProfile}
                                onCancel={this.toggleEditProfile}
                            />
                        )}
                        <button
                            className="delete-profile-button"
                            onClick={this.handleDeleteProfile}
                        >
                            Delete Profile
                        </button>
                    </div>

                    <div className="counters-section">
                        <div className="counters">
                            <FollowersCounter count={this.state.followersCount} />
                            <FollowingCounter count={this.state.followingCount} />
                        </div>
                        <FollowersList followers={this.state.followers} />
                        <FollowingList following={this.state.following} />
                    </div>

                    {user && user.isAdmin && <AdminDashboard />}
                </div>
            </div>
        );
    }
}

export default ProfilePage;
