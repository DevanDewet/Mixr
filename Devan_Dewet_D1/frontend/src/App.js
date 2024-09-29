import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import PlaylistPage from './pages/PlaylistPage';
import Profile from './pages/Profile';
import Splash from './pages/Splash';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

//Components 

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/PlaylistPage" element={<PlaylistPage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Signup" element={<SignUp />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
