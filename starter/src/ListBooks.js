import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';

// ListBooks component is responsible for displaying books categorized by their shelf status
function ListBooks({ booksLibrary, onBookStatusUpdate }) {

    // Function to handle updates on book's status (shelf)
    const handleBookStatusChange = (updatedBook) => {
      // If the onBookStatusUpdate function is passed as a prop, invoke it with the updated book data
      if (onBookStatusUpdate) {
        onBookStatusUpdate(updatedBook);
      }
    };

    return (
        <div className="list-books">
            {/* Title section of the list-books */}
            <div className="list-books-title">
                <h1>MyReads</h1>
                {/* Link to navigate to search page for adding new books */}
                <Link to='/search-books' className='add-contact'>
                    <span>
                        {/* SVG icon for the "Add book" action */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9,1 C13.418278,1 17,4.581722 17,9 C17,10.8482015 16.3732643,12.550021 15.3207287,13.9045228 L18.7097475,17.2955339 C19.1002718,17.6860582 19.1002718,18.3192232 18.7097475,18.7097475 C18.3192232,19.1002718 17.6860582,19.1002718 17.2955339,18.7097475 L13.9045228,15.3207287 C12.550021,16.3732643 10.8482015,17 9,17 C4.581722,17 1,13.418278 1,9 C1,4.581722 4.581722,1 9,1 Z M9,3 C5.6862915,3 3,5.6862915 3,9 C3,12.3137085 5.6862915,15 9,15 C12.3137085,15 15,12.3137085 15,9 C15,5.6862915 12.3137085,3 9,3 Z"></path>
                        </svg>
                    </span>
                </Link>
            </div>

            {/* Main content section where books are categorized into different shelves */}
            <div className="list-books-content">
                <div>
                    {/* Currently Reading shelf */}
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {/* Map through books and render only those that are on the 'currentlyReading' shelf */}
                                {booksLibrary.map((book) => {
                                    if (book.shelf === 'currentlyReading') {
                                        return (
                                            <li key={book.id}>
                                                <Book 
                                                    book={book} 
                                                    onChange={(updatedBook) => handleBookStatusChange(updatedBook)} />
                                            </li>
                                        );
                                    } else {
                                        return null; // Return null if the book is not in this shelf
                                    }
                                })}
                            </ol>
                        </div>
                    </div>

                    {/* Want to Read shelf */}
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {/* Map through books and render only those that are on the 'wantToRead' shelf */}
                                {booksLibrary.map((book) => {
                                    if (book.shelf === 'wantToRead') {
                                        return (
                                            <li key={book.id}>
                                                <Book 
                                                    book={book} 
                                                    onChange={(updatedBook) => handleBookStatusChange(updatedBook)} />
                                            </li>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </ol>
                        </div>
                    </div>

                    {/* Read shelf */}
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {/* Map through books and render only those that are on the 'read' shelf */}
                                {booksLibrary.map((book) => {
                                    if (book.shelf === 'read') {
                                        return (
                                            <li key={book.id}>
                                                <Book 
                                                    book={book} 
                                                    onChange={(updatedBook) => handleBookStatusChange(updatedBook)} />
                                            </li>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button/link to navigate to the search page to add new books */}
            <div className="open-search">
                <Link to='/search-books' className='add-contact'>Add a book</Link>
            </div>
        </div>
    );
}

// Prop validation to ensure correct data types are passed to the component
ListBooks.propTypes = {
    booksLibrary: PropTypes.array.isRequired, // Array of books to display
    onBookStatusUpdate: PropTypes.func.isRequired // Function to update the status (shelf) of a book
};

export default ListBooks;
