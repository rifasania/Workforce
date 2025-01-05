const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const upahRoutes = require('./routes/upahRoutes');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');

dotenv.config();

// Koneksi Database
connectDB();

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
}));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/upah', upahRoutes);

// Middleware Error Handling
app.use(errorHandler);

// Server Listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
