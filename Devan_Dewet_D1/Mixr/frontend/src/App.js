import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Profile from './pages/Profile';
import Splash from './pages/Splash';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px' }}>
        <Link to="/Splash" style={{ padding: '10px', textDecoration: 'none' }}>Splash</Link>
        <Link to="/Home" style={{ padding: '10px', textDecoration: 'none' }}>Home</Link>
        <Link to="/Playlist" style={{ padding: '10px', textDecoration: 'none' }}>Playlist</Link>
        <Link to="/Profile" style={{ padding: '10px', textDecoration: 'none' }}>Profile</Link>
      </nav>
      <Routes>
        <Route path="/Splash" element={<Splash />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Playlist" element={<Playlist />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
