require("dotenv").config();

// Load dependencies
const express = require("express");
const router = require("./routes/main");
// const connectDB = require("./config/db");

// Start express
const app = express();

// Connect Database
// connectDB();
require("./models/db");

// Setup middlewares
app.use(express.json());

// Setup routes
app.use("/api", router);

// app.get("/", (req, res) => res.send("Hello World!"));
// app.use("/api/books", books);

app.listen((port = process.env.PORT || 8000), () =>
  console.log(`Server running on port ${port}`)
);
