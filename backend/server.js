const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key_academic_project',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const dietRoutes = require('./routes/dietRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/recipes', recipeRoutes);

// Connect Database and Start Server
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } else {
        console.error('Failed to connect to DB', err);
    }
});
