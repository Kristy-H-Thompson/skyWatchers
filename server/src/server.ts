import dotenv from 'dotenv';
import express from 'express';
dotenv.config();


/* 
------------------------------------------------------------------------------------------------------------

    IMPORTING THE ROUTES - set up the route
      - // TODO: Serve static files of entire client dist folder
      - // TODO: Implement middleware for parsing JSON and urlencoded form data
      - // TODO: Implement middleware to connect the routes

------------------------------------------------------------------------------------------------------------ 
*/

import routes from './routes/index.js';
// Set up the app
const app = express();

// Set up which port to use
const PORT = process.env.PORT || 3001;

// Serve static files of entire client dist folder
app.use(express.static('../client/dist')); // Adjust 'dist' path if necessary

// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json()); // To parse application/json
app.use(express.urlencoded({ extended: true })); // To parse application/x-www-form-urlencoded

// Implement middleware to connect the routes
app.use(routes); // Assuming routes is a properly defined router or set of routes

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
