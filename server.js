const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const mongoose = require('mongoose')
const app = express();
const dotenv = require("dotenv").config()

connectDB();

const port = process.env.PORT || 5001;

 app.use(express.json()) //middleware that allows to parse json
// Middleware for contactRoutes Router
app.use('/api/contacts', require ("./routes/contactRoutes"));
// Middleware for userRoutes Router
app.use('/api/user', require ("./routes/userRoutes"));
app.use(errorHandler); // Custom middleware to handle errors

app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})