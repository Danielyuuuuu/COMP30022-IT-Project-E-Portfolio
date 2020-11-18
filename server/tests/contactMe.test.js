require('dotenv').config();

const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");

const ContactMe = require("../models/contactMe");
const contactMeController = require("../controllers/contactMe");

beforeAll(async () => {
  await mongoose.disconnect();
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
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Contact Me Model Test", () => {

  it("submit a contact me message successfully", async () => {
    const contactMeData =
      {
        name: "test",
        email: "test@gmail.com",
        subject: "Hello test",
        message: "Message test",
        profilePhoto: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
      };
    const validContactMe = new ContactMe(contactMeData);
    const savedContactMe = await validContactMe.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedContactMe._id).toBeDefined();
    expect(savedContactMe.name).toBe(contactMeData.name);
    expect(savedContactMe.email).toBe(contactMeData.email);
    expect(savedContactMe.subject).toBe(contactMeData.subject);
    expect(savedContactMe.message).toBe(contactMeData.message);
    expect(savedContactMe.profilePhoto).toBe(contactMeData.profilePhoto);
  });

});