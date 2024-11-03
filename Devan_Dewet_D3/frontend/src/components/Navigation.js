import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/navigation.css'

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3">
                <div className="container-fluid">
                    <NavLink to="/Home" className="navbar-brand text-primary" style={{ fontSize: '7rem', fontWeight: 'bold' }}>
                        Mixr
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink 
                                    to="/Home" 
                                    className={({ isActive }) => 
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/PlaylistPage" 
                                    className={({ isActive }) => 
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Playlist
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink 
                                    to="/Profile" 
                                    className={({ isActive }) => 
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Profile
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
