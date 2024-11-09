import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import helmet from 'helmet';  // Optional, for security

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware (optional, for added security in production)
app.use(helmet());

// Middleware to set the correct MIME types
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    } else if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

// Serve static files from 'client/public' and 'client/dist'
app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use routes
import routes from './routes/index.js';
app.use(routes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});