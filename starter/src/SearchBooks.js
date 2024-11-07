import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import { searchBooks } from './BooksAPI';

import PropTypes from 'prop-types';

/**
 * Component for searching and displaying books
 * @param {Object} props - Component props
 * @param {Function} props.onBookUpdate - Callback function for updating a book
 * @param {Array} props.library - List of books in the library
 * @returns {JSX.Element} - SearchBooks component
 */
function BookSearchComponent({ onBookUpdateCallback, libraryData }) {
    // State variable to store the search query
    const [searchQuery, setSearchQuery] = useState('');

    // State variable to store the search results
    const [searchResults, setSearchResults] = useState([]);

    // State variable to indicate whether the search is in progress
    const [isSearching, setIsSearching] = useState(false);

    /**
     * Handles the input change event
     * @param {Object} event - Input change event
     */
    const handleInputChangeEvent = (event) => {
        // Update the search query state variable
        setSearchQuery(event.target.value);
    };

    /**
     * Handles the search button click event
     */
    const handleSearchButtonClick = async () => {
        // Set the searching state variable to true
        setIsSearching(true);

        try {
            // Call the BooksAPI search function to retrieve the search results
            const searchResultsData = await BooksAPI.search(searchQuery);

            // Update the search results state variable
            setSearchResults(searchResultsData);
        } catch (error) {
            // Log any errors that occur during the search
            console.error(error);
        } finally {
            // Set the searching state variable to false
            setIsSearching(false);
        }
    };

    /**
     * Handles the book update event
     * @param {Object} book - Book object
     * @param {string} shelf - New shelf for the book
     */
    const handleBookUpdateEvent = (book, shelf) => {
        // Call the onBookUpdateCallback function to update the book
        onBookUpdateCallback({ ...book, shelf });
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={searchQuery}
                        onChange={handleInputChangeEvent}
                    />
                    <button onClick={handleSearchButtonClick} disabled={isSearching}>
                        Search
                    </button>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                            onBookUpdate={handleBookUpdateEvent}
                            library={libraryData}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
}

BookSearchComponent.propTypes = {
    onBookUpdateCallback: PropTypes.func.isRequired,
    libraryData: PropTypes.array.isRequired,
};

export default BookSearchComponent;