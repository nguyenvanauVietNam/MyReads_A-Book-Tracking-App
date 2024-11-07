import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter to handle routing in the app
import App from './App'; // Import the main App component
import './styles.css'; // Import global CSS file to style the application

// Render the application to the DOM
ReactDOM.render(
    // Wrap the App component with BrowserRouter to enable routing functionality
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    
    // Attach the rendered React app to the 'root' DOM element
    document.getElementById('root') 
);
