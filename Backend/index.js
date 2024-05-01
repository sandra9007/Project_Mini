const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const childRoutes = require('./routes/child');

const app = express();
const port = 3000;

app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user-registration');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use routes
app.use('/user', userRoutes);
app.use('/', childRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
