import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    constructor(props) {
        super(props);
        // Bind the event handler to the current class instance
        this.handleShelfChange = this.handleShelfChange.bind(this);
    }

    // Event handler for changing the shelf status of the book
    handleShelfChange(event) {
        // Prepare the book shelf update object
        const updatedBookShelf = {
            id: this.props.book.id,
            shelf: event.target.value,
            bookObj: this.props.book,
        };

        // Only trigger the onChange callback if the shelf value has changed
        if (this.props.book.shelf !== event.target.value) {
            this.props.onChange(updatedBookShelf);
        }
    }

    render() {
        const { book, myReads = [] } = this.props; // Destructure props
        let shelfStatus = 'none'; // Default shelf status

        // Determine the shelf status of the book based on 'myReads' prop or the book's shelf
        if (myReads.length > 0) {
            myReads.forEach((bookInShelf) => {
                if (bookInShelf.id === book.id) {
                    shelfStatus = bookInShelf.shelf;
                }
            });
        } else {
            shelfStatus = book.shelf;
        }

        return (
            <div className="book" key={book.id}>
                <div className="book-top">
                    {/* Conditionally render book cover image */}
                    {book.imageLinks && book.imageLinks.thumbnail && book.imageLinks.length > 0 && (
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundColor: '#1c1c1c',
                                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
                            }}
                        ></div>
                    )}
                    <div className="book-shelf-changer">
                        {/* Dropdown to select shelf status */}
                        <select value={shelfStatus || 'none'} onChange={this.handleShelfChange}>
                            <option value="move" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                {/* Conditionally render book title */}
                {book.title && <div className="book-title">{book.title}</div>}
                {/* Conditionally render book authors */}
                {book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}
            </div>
        );
    }
}

// Define prop types for the Book component
Book.propTypes = {
    book: PropTypes.object.isRequired,    // Book object is required
    myReads: PropTypes.arrayOf(PropTypes.object),  // Array of books (optional)
    onChange: PropTypes.func.isRequired,  // Function to handle shelf change (required)
};

export default Book;
