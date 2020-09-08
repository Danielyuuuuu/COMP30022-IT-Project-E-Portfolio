const mongoose = require("mongoose");

MONGO_URL =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}?${process.env.DB_OPTIONS}`;

mongoose.connect(MONGO_URL || "mongodb://localhost/COMP30022", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" + db.port);
});

// Load schemas and map to Mongoose models
require("./book");
