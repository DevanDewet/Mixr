import React from 'react';
import { FaSearch } from 'react-icons/fa'; 
import '../css/search.css'; 

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    handleChange = (event) => {
        this.setState({ query: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // Handle the search query here
        console.log('Search query:', this.state.query);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="search-form">
                <input
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder="Search..."
                    className="search-input"
                />
                <FaSearch className="search-icon" onClick={this.handleSubmit} />
            </form>
        );
    }
}

export default Search;
