// Base URL for the API
const apiUrl = "https://reactnd-books-api.udacity.com";

// Generate or retrieve the unique token for storing bookshelf data on the backend server
let authToken = localStorage.token; // Retrieve token from localStorage
if (!authToken) {
  // If no token exists, generate a new random token and store it in localStorage
  authToken = localStorage.token = Math.random().toString(36).substr(-8);
}

// Headers for making requests, including Authorization token
const requestHeaders = {
  'Accept': 'application/json', // Accept JSON response
  'Authorization': authToken,   // Send the generated or existing token for authentication
};

// Function to get a specific book by its ID from the API
export const getBook = (bookId) =>
  fetch(`${apiUrl}/books/${bookId}`, { headers: requestHeaders })
    .then(response => response.json())  // Parse the JSON response
    .then(data => data.book);           // Extract the 'book' object from the response

// Function to get all books in the library from the API
export const getAllBooks = () =>
  fetch(`${apiUrl}/books`, { headers: requestHeaders })
    .then(response => response.json())  // Parse the JSON response
    .then(data => data.books);          // Extract the 'books' array from the response

// Function to update a book's shelf on the backend
export const updateBookShelf = (book, shelf) =>
  fetch(`${apiUrl}/books/${book.id}`, {
    method: 'PUT',                     // HTTP method to update the resource
    headers: {
      ...requestHeaders,               // Include default headers with the authorization token
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({ shelf }),    // Send the updated shelf in the request body
  }).then(response => response.json()); // Parse and return the response JSON

// Function to search for books based on a query
export const searchBooks = (query) =>
  fetch(`${apiUrl}/search`, {
    method: 'POST',                    // HTTP method for creating a search request
    headers: {
      ...requestHeaders,               // Include default headers with the authorization token
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({ query }),    // Send the query in the request body
  })
    .then(response => response.json()) // Parse the JSON response
    .then(data => data.books);          // Extract and return the 'books' array from the response
