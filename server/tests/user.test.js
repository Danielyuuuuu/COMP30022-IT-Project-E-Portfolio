require('dotenv').config();

const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const User = require("../models/User");
const userController = require("../controllers/user");

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });

  // const storage = new GridFsStorage({
  //   url: global.__MONGO_URI__,
  //   file: (req, file) => {
  //     return new Promise((resolve, reject) => {
  //       crypto.randomBytes(16, (err, buf) => {
  //         if (err) {
  //           return reject(err);
  //         }
  //         const filename = buf.toString("hex") + path.extname(file.originalname);
  //         const fileInfo = {
  //           filename: filename,
  //           bucketName: "jest.uploads",
  //         };
  //         resolve(fileInfo);
  //       });
  //     });
  //   },
  // });
  //
  // const upload = multer({ storage });
});

afterAll(async () => {
  await mongoose.disconnect();
})

describe("User Model Test", () => {

  it("create & save user successfully", async () => {
    const userData =
      {
        name: "dummy",
        email: "testdummy@gmail.com",
        password: "123456",
        date: new Date()
      };
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.date).toBe(userData.date);
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert user successfully, but the field does not defined in schema should be undefined", async () => {
    const userWithInvalidField = new User({
      name: "dummy2",
      email: "testdummy2@gmail.com",
      password: "12321",
      gender: "male",
      nickname: "noob"
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.gender).toBeUndefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should told us the errors in gender field.
  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new User({ name: "dummy3" });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

});

describe("User Controller Test", () => {

  it('Should successfully create a new user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body:
        {
          name: "dummy4",
          email: "testdummy4@gmail.com",
          password1: "123456",
          password2: "123456"
        }
    });
    const res = httpMocks.createResponse(req);
    await userController.postUserRegister(req, res)
      .then(async () => {
        const body = await res._getData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('user');
        expect(body.user).toHaveProperty('name');
        expect(body.user).toHaveProperty('email');
        expect(body.user).toHaveProperty('password');
        expect(body.user).toHaveProperty('date');
        expect(body.user.name).toBe('dummy4');
        expect(body.user.email).toBe('testdummy4@gmail.com');
      });
  });

  it('Should fail to create a new user with existing email', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body:
        {
          name: "dummy4",
          email: "testdummy4@gmail.com",
          password1: "123456",
          password2: "123456"
        }
    });
    const res = httpMocks.createResponse(req);
    await userController.postUserRegister(req, res)
      .then(async () => {
        const body = await res._getData();
        expect(res.statusCode).toBe(400);
        // expect(body).toHaveProperty('msg');
        // expect(body.msg).toBe('User Already Exists');
      });
  });

  it('Should successfully login to an existing user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body:
        {
          email: "testdummy4@gmail.com",
          password: "123456"
        }
    });
    const res = httpMocks.createResponse(req);
    await userController.postUserLogin(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('user');
        expect(body).toHaveProperty('token');
        expect(body.user).toHaveProperty('name');
        expect(body.user).toHaveProperty('id');
        expect(body.user.name).toBe('dummy4');
      });
  });

  it('Should fail to login to an unknown user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body:
        {
          email: "kadjh82y4",
          password: "489sf"
        }
    });
    const res = httpMocks.createResponse(req);
    await userController.postUserLogin(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(400);
        expect(body).toHaveProperty('msg');
        expect(body.msg).toBe('No account with this email has been registered.');
      });
  });
});