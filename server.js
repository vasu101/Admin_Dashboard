const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Admin Dashboard API');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Employee routes
app.use('/api/employee', employeeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});
