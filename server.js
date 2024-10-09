require('dotenv').config();

const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const connectDB = require('./helpers/db');

connectDB();

server.use(express.json());

server.use('/subscribers', require('./routes/subscribers'));

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});