const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");


MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_TABLE}?${process.env.DB_OPTIONS}`;

mongoose.connect(MONGO_URL || "mongodb://localhost/COMP30022", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
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
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

// // create storage engine
// const storeStorage = new GridFsStorage({
//   url: MONGO_URL,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         // file.name = req.body.name;
//         // const name = file.originalname;
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           // filename: file.name,
//           filename: filename,
//           bucketName: "storeitems",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

const upload = multer({ storage });
// const uploadStore = multer({ storage: storeStorage });

// Load schemas and map to Mongoose models
require("./book");
require("./item");
require("./User");
require("./artwork");
require("./blog");
require("./comments");




// exports the var
exports.upload = upload;
// exports.uploadStore = uploadStore;
exports.db = db;
exports.mongo_url = MONGO_URL;
