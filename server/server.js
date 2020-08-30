require("dotenv").config();

// Load dependencies
const express = require("express");
const router = require("./routes/main");
const cors = require("cors");

// Start express
const app = express();

// Connect Database
require("./models/db");

// Allow cors
app.use(cors({ origin: true, credentials: true }));

// Setup middlewares
app.use(express.json());

// Setup routes
app.use("/api", router);

// Server listener
app.listen((port = process.env.PORT || 8000), () =>
  console.log(`Server running on port ${port}`)
);
