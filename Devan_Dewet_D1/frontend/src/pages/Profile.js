// ProfilePage.js
import React from 'react';
import ProfilePreview from '../components/ProfilePreview';
import FollowersList from '../components/FollowersList';
import FollowingList from '../components/FollowingList';
import FollowersCounter from '../components/FollowersCounter';
import FollowingCounter from '../components/FollowingCounter';
import EditProfile from '../components/EditProfile';
import Navigation from '../components/Navigation';

import '../css/profilepage.css';

class ProfilePage extends React.Component {
  state = {
    user: {
        id: 1,
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/50",
        bio: "Music lover and playlist curator.",
    },
    followers: [
        { id: 2, name: "Jane Smith", profilePicture: "https://via.placeholder.com/50", bio: "Music enthusiast." },
        { id: 3, name: "Sam Brown", profilePicture: "https://via.placeholder.com/50", bio: "Guitarist and songwriter." },
    ],
    following: [
        { id: 4, name: "Lisa White", profilePicture: "https://via.placeholder.com/50", bio: "DJ and music producer." },
        { id: 5, name: "Mike Johnson", profilePicture: "https://via.placeholder.com/50", bio: "Singer and performer." },
    ],
    followersCount: 2,
    followingCount: 2,
    editingProfile: false
};

    toggleEditProfile = () => {
        this.setState({ editingProfile: !this.state.editingProfile });
    };

    handleActionClick = (user) => {
        // Handle actions like edit or follow/unfollow
        console.log(user);
    };

    handleUpdateProfile = (updatedProfile) => {
      this.setState({ user: updatedProfile });
  };

    render() {
      return (
          <div className="profile-page">
             <Navigation />
              <ProfilePreview user={this.state.user} />
              {this.state.editingProfile && (
                  <EditProfile
                      profile={this.state.user}
                      onUpdateProfile={this.handleUpdateProfile} // Add this if you have an update handler
                  />
              )}
              <button onClick={this.toggleEditProfile}>
                  {this.state.editingProfile ? 'Cancel' : 'Edit Profile'}
              </button>
              
              <div className="counters">
                  <FollowersCounter count={this.state.followersCount} />
                  <FollowingCounter count={this.state.followingCount} />
              </div>
              <FollowersList followers={this.state.followers} onActionClick={this.handleActionClick} />
              <FollowingList following={this.state.following} onActionClick={this.handleActionClick} />
          </div>
      );
  }
    }


export default ProfilePage;
