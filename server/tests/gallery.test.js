require('dotenv').config();

const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");

const Artwork = require("../models/artwork");
const galleryController = require("../controllers/gallery");

const artworkData =
  {
    category: "photography",
    subcategory: "landscape",
    imagenames: ["sea.jpg","mountain.jpg","land.jpg"],
  };

const artworkData2 =
  {
    category: "photography",
    subcategory: "people",
    imagenames: ["ppl1.jpg","ppl2.jpg","ppl3.jpg"],
  };

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
})

describe("Artwork Model Test", () => {
  it("create & save an artwork successfully", async () => {
    const validArtwork = new Artwork(artworkData);
    const savedArtwork = await validArtwork.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedArtwork._id).toBeDefined();
    expect(savedArtwork.category).toBe(artworkData.category);
    expect(savedArtwork.subcategory).toBe(artworkData.subcategory);
    expect(savedArtwork.imagenames).toEqual(
      expect.arrayContaining(artworkData.imagenames)
    )
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert artwork successfully, but the field does not defined in schema should be undefined", async () => {
    // low-frills deep copy object
    let tempartworkData2 = JSON.parse(JSON.stringify(artworkData2));
    tempartworkData2.size = 3;
    const artworkWithInvalidField = new Artwork(tempartworkData2);
    const savedArtworkWithInvalidField = await artworkWithInvalidField.save();
    expect(savedArtworkWithInvalidField._id).toBeDefined();
    expect(savedArtworkWithInvalidField.size).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should told us the errors in gender field.
  it("create artwork without required field should failed", async () => {
    const artworkWithoutRequiredField = new Artwork({ category: "photography" });
    let err;
    try {
      const savedArtworkWithoutRequiredField = await artworkWithoutRequiredField.save();
      error = savedArtworkWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.subcategory).toBeDefined();
  });
});

describe("Gallery Controller Test", () => {
  it('Should successfully retrieve all existing artworks', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
    });
    const res = httpMocks.createResponse(req);
    await galleryController.getAllArtworks(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('artworks');
        // check whether our 1st artwork (artworkData) is in one of the retrieved artworks
        // since the res is an array of object, each containing an artwork entry
        // so we first ues arrayContaining to check each entry in the database
        // then use objectContaining to check the object has partial match with our artworkData
        expect(body.artworks).toEqual(
          expect.arrayContaining(
            [expect.objectContaining(artworkData)]
          )
        )
      });
  });

  it('Should successfully get the right artworks under the same sub-category', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        category: "photography",
      }
    });
    const res = httpMocks.createResponse(req);
    await galleryController.getArtworksUnderCat(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('artworks');
        // since artworkData is also from landscape category,
        // we should expect to find in the the result (body).
        expect(body.artworks).toEqual(
          expect.arrayContaining(
            [expect.objectContaining(artworkData)]
          )
        );
      });
  });

  it('Should not get any artworks under an non exist category', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        category: "empty",
      }
    });
    const res = httpMocks.createResponse(req);
    await galleryController.getArtworksUnderCat(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('artworks');
        // we should expect an empty array in the body,
        // as there is no category named "empty" in the database up to this point
        expect(body.artworks).toEqual(
          expect.not.arrayContaining(
            [expect.objectContaining(artworkData)]
          )
        );
        expect(body.artworks).toEqual([]);
      });
  });

  it('Should successfully get the right artworks under the same sub-category', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        category: "photography",
        subcategory: "people",
      }
    });
    const res = httpMocks.createResponse(req);
    await galleryController.getArtworksUnderSubcat(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('artworks');
        // we should expect to see artworkData2 only as it is the only entry in "people" subcategory
        expect(body.artworks).toEqual(
          expect.arrayContaining(
            [expect.objectContaining(artworkData2)]
          )
        );
        expect(body.artworks).toEqual(
          expect.not.arrayContaining(
            [expect.objectContaining(artworkData)]
          )
        );
      });
  });

  it('Should successfully update the image names given the category and sub-category names', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        category: "photography",
        subcategory: "landscape",
        imagenames: ["sea.jpg","milkyway.jpg","subset.jpg","beach.jpg"],
      }
    });
    const res = httpMocks.createResponse(req);
    await galleryController.updateArtwork(req, res)
      .then(async () => {
        const body = await res._getData();
        expect(res.statusCode).toBe(200);
        expect(body).toBe("Added successfully");
      });
  });
});