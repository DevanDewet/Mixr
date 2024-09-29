import React from 'react';
import Navigation from '../components/Navigation';

//components
import SongFeed from '../components/SongFeed';

class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            songs : [
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Blinding Lights',
                    artist: 'The Weeknd',
                    album: 'After Hours',
                    duration: '3:20'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Watermelon Sugar',
                    artist: 'Harry Styles',
                    album: 'Fine Line',
                    duration: '2:54'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Levitating',
                    artist: 'Dua Lipa',
                    album: 'Future Nostalgia',
                    duration: '3:23'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Save Your Tears',
                    artist: 'The Weeknd',
                    album: 'After Hours',
                    duration: '3:35'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Don’t Start Now',
                    artist: 'Dua Lipa',
                    album: 'Future Nostalgia',
                    duration: '3:03'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Good 4 U',
                    artist: 'Olivia Rodrigo',
                    album: 'SOUR',
                    duration: '2:58'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Kiss Me More',
                    artist: 'Doja Cat',
                    album: 'Planet Her',
                    duration: '3:29'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Montero (Call Me By Your Name)',
                    artist: 'Lil Nas X',
                    album: 'MONTERO',
                    duration: '2:17'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Industry Baby',
                    artist: 'Lil Nas X & Jack Harlow',
                    album: 'MONTERO',
                    duration: '3:32'
                },
                {
                    coverImage: 'https://via.placeholder.com/80',
                    title: 'Peaches',
                    artist: 'Justin Bieber',
                    album: 'Justice',
                    duration: '3:18'
                }
            ]
        };
    }

  render() {
    return (

     <div className="home-page">
        <Navigation />
        <SongFeed songs={this.state.songs} />
    </div>
      
      
    );
  }
}

export default Home;
