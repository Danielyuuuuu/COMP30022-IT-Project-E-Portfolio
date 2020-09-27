const mongoose = require("mongoose");
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const { setRandomFallback } = require("bcryptjs");

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

// create storage engine for the image
const storage = new GridFsStorage({
  url: MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// Load schemas and map to Mongoose models
require("./book");




// exports the var
exports.upload = upload;
exports.db = db;