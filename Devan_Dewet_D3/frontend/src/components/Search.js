
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../css/search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            loading: false,
            error: null,
        };
    }

    handleChange = (event) => {
        this.setState({ query: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { type } = this.props; 

        
        if (this.state.query.trim() === '') {
            this.setState({ results: [] });
            return;
        }

        this.setState({ loading: true, error: null });

        try {
            
            const endpoint = type === 'all' 
            ? `http://localhost:5000/api/search/all/search/${this.state.query}` 
            : `http://localhost:5000/api/search/${type}/search/${this.state.query}`;

            const response = await fetch(endpoint);

            
            if (!response.ok) {
                const errorMessage = await response.text(); 
                throw new Error(`Failed to fetch results: ${errorMessage}`);
            }

            const data = await response.json();

            
            const results = type === 'all' 
                ? [...data.users, ...data.playlists, ...data.songs]
                : data; 

            this.setState({ results, loading: false });
        } catch (error) {
            this.setState({ loading: false, error: error.message });
            console.error('Error fetching search results:', error);
        }
    };

    render() {
        const { query, results, loading, error } = this.state;

        return (
            <div className="search-container">
                <form onSubmit={this.handleSubmit} className="d-flex align-items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={this.handleChange}
                        placeholder="Search..."
                        className="form-control me-2 search-input"
                        aria-label="Search"
                    />
                    <button type="submit" className="btn btn-outline-secondary">
                        <FaSearch />
                    </button>
                </form>

                {loading && <p>Loading results...</p>}
                {error && <p>Error: {error}</p>}
                {results.length > 0 && (
                    <ul className="search-results">
                        {results.map((item) => (
                            <li key={item._id} className="search-result-item">
                                {item.name || item.username || item.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default Search;
