import React, { useState, useEffect } from 'react';
import './styles.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import { Route, Routes, useNavigate } from 'react-router-dom';

function BooksApp() {
  // State to hold the list of books in the library
  const [library, setLibrary] = useState([]);

  // Fetch books from the API once after the component is mounted
  useEffect(() => {
    // Asynchronous function to fetch all books
    async function fetchLibraryBooks() {
      // Get all books from the API
      const books = await BooksAPI.getAll();
      // Set the library state with the fetched books
      setLibrary(books);
    }

    fetchLibraryBooks();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Function to update the status (shelf) of a book
  const updateBookShelfStatus = (bookUpdate) => {
    let bookFound = false; // Flag to check if the book is already in the library

    // Filter out the book if it's being removed (shelf is 'none')
    const updatedLibrary = library
      .filter((book) => {
        // Remove the book if its shelf is set to 'none'
        return !(book.id === bookUpdate.id && bookUpdate.shelf === 'none');
      })
      .map((book) => {
        // If the book exists, update its shelf
        if (book.id === bookUpdate.id && bookUpdate.shelf !== 'none') {
          bookFound = true;
          return { ...book, shelf: bookUpdate.shelf }; // Return updated book with new shelf
        }
        return book; // Return unchanged book
      });

    // If the book wasn't found, add it to the library with its new shelf
    if (!bookFound) {
      const newBook = { ...bookUpdate.bookObj, shelf: bookUpdate.shelf }; // Add new book with shelf
      updatedLibrary.push(newBook); // Add the new book to the updated library
    }

    // Update the library state with the modified list
    setLibrary(updatedLibrary);

    // Make API request to update the book's shelf status
    BooksAPI.update(bookUpdate.bookObj, bookUpdate.shelf);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <ListBooks
              library={library} // Pass the current library state
              onBookUpdate={(bookUpdate) => {
                updateBookShelfStatus(bookUpdate); // Update book shelf status on change
              }}
            />
          }
          exact
        />
        <Route
          path="/search-books"
          element={
            <SearchBooks
              library={library} // Pass the current library state
              onBookUpdate={(bookUpdate) => {
                updateBookShelfStatus(bookUpdate); // Update book shelf status on change
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default () => {
  const navigate = useNavigate(); // Hook for navigation
  return <BooksApp navigate={navigate} />;
};
