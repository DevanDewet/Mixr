import React from 'react';
import Navigation from '../components/Navigation';
import SongFeed from '../components/SongFeed';
import Logout from '../components/Logout';
import Search from '../components/Search';
class Home extends React.Component {
    render() {
        return (
            <div className="home-page">
                <Navigation />
                <Search type="all" />
                <SongFeed />
                <Logout />
            </div>
        );
    }
}

export default Home;
