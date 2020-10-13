require('dotenv').config();

const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const crypto = require("crypto");
// const multer = require("multer");
const fs = require("fs");
const GridFsStorage = require("multer-gridfs-storage");

const uploadController = require("../controllers/upload");



beforeAll(async () => {
  await mongoose.createConnection(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });

  const storage = new GridFsStorage({
    url: global.__MONGO_URI__,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          // const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: file.originalname,
            bucketName: "uploads",
          };
          resolve(fileInfo);
        });
      });
    },
  });

  // const upload = multer({ storage });
});

afterAll(async () => {
  await mongoose.disconnect();
})


describe("Upload File Test", () => {

  it('Should successfully upload a file to mongoDB', async () => {
    let file = 'tests/image/landscape.jpg';

    const req = httpMocks.createRequest({
      method: 'POST',
      body: fs.createReadStream(file),
    },fs.createReadStream(file));
    const res = httpMocks.createResponse(req);
    await uploadController.postFile(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('msg');
        expect(body.msg).toBe('Success from back end');
      });
  });

  // it('Should successfully get all files', async () => {
  //   const req = httpMocks.createRequest({
  //     method: 'GET',
  //   });
  //   const res = httpMocks.createResponse(req);
  //   await uploadController.getAllFiles(req, res)
  //     .then(async () => {
  //       const body = await res._getJSONData();
  //       expect(res.statusCode).toBe(200);
  //       expect(body).toHaveProperty('msg');
  //       expect(body.msg).toBe('Success from back end');
  //     });
  // });

});