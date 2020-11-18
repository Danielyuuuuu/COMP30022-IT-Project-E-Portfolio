require('dotenv').config();

const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");

const BlogModel = require("../models/blog");
const blogController = require("../controllers/blog");

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

describe("blog Model Test", () => {

  it("create & save post successfully", async () => {
    const blogData =
      {
        title: "dummy",
        content: "test content",
        thumbnails: {imagename: "/api/uploadManage/image/structure-wood-macro-D71_0662-free-image-973x649.jpg"},
        commentblock: "5f740ebbbbab65422c7a853a",
        hashtags: ["Test", "Hello"]
      };
    const validBlogData = new BlogModel(blogData);
    const savedBlog = await validBlogData.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedBlog._id).toBeDefined();
    expect(savedBlog.title).toBe(validBlogData.title);
    expect(savedBlog.content).toBe(validBlogData.content);
    expect(savedBlog.thumbnails).toBe(validBlogData.thumbnails);
    expect(savedBlog.commentblock).toBe(validBlogData.commentblock);
    expect(savedBlog.hashtags).toBe(validBlogData.hashtags);
  });

});