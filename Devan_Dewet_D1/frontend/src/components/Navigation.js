import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navigation.css';
import Search from './Search';

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar">
               
                <ul>
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Splash
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/Home" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/PlaylistPage" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Playlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/Profile" 
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            Profile
                        </NavLink>
                    </li>
                </ul>
                <div className="navbar-brand">Mixr</div>

                <Search />
            </nav>
        );
    }
}

export default Navigation;
