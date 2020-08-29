const express = require("express");
const connectDB = require("./config/db");

const app = express();

// routes
const books = require('./routes/api/books')

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("Hello World!"));
app.use('/api/books', books);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
