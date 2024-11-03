import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import PlaylistPage from './pages/PlaylistPage';
import Profile from './pages/Profile';
import Splash from './pages/Splash';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import LogoutWrapper from './components/Logout';
import './css/theme.css';
//Components 

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/PlaylistPage" element={<PlaylistPage />} />
          <Route path="/PlaylistPage/:playlistId" element={<PlaylistPage />} />
          <Route path="/Profile/:userId" element={<Profile />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Logout" element={<LogoutWrapper />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
