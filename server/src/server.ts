import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.static('dist')); // Adjust 'dist' path if necessary

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json()); // To parse application/json
app.use(express.urlencoded({ extended: true })); // To parse application/x-www-form-urlencoded

// TODO: Implement middleware to connect the routes
app.use(routes); // Assuming routes is a properly defined router or set of routes


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
