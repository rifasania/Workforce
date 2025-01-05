const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const upahRoutes = require('./routes/upahRoutes');

dotenv.config();

// Koneksi Database
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/upah', upahRoutes);

// Server Listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const errorHandler = require('./middlewares/errorHandler');

// Middleware Error Handling
app.use(errorHandler);

const morgan = require('morgan');

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
