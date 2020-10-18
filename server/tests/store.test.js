require('dotenv').config();

const mongoose = require("mongoose");
const httpMocks = require("node-mocks-http");

const Item = require("../models/item");
const storeController = require("../controllers/store");

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

describe("Store Model Test", () => {

  it("create & save an item successfully", async () => {
    const itemData =
      {
        itemname: "item1",
        description: "for testing",
        imagename: "item.jpg",
        price: 10,
        tag: "painting",
      };
    const validItem = new Item(itemData);
    const savedItem = await validItem.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedItem._id).toBeDefined();
    expect(savedItem.item).toBe(itemData.item);
    expect(savedItem.description).toBe(itemData.description);
    expect(savedItem.imagename).toBe(itemData.imagename);
    expect(savedItem.price).toBe(itemData.price);
    expect(savedItem.tag).toBe(itemData.tag);
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert item successfully, but the field does not defined in schema should be undefined", async () => {
    const itemWithInvalidField = new Item({
      itemname: "item2",
      imagename: "item2 description",
      price: 2,
      tag: "painting",
      location: "AU",
    });
    const savedUserWithInvalidField = await itemWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.location).toBeUndefined();
  });

  // Test Validation is working!!!
  // It should told us the errors in gender field.
  it("create item without required field should failed", async () => {
    const itemWithoutRequiredField = new Item({ itemname: "item3" });
    let err;
    try {
      const savedItemWithoutRequiredField = await itemWithoutRequiredField.save();
      error = savedItemWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.imagename).toBeDefined();
    expect(err.errors.price).toBeDefined();
    expect(err.errors.tag).toBeDefined();
  });

});

describe("Store Controller Test", () => {
  var storeditem;
  var deleteitem;

  // since some function require updating an existing item in the databse
  // so we could fetch an item and store it first, then later reuse it.
  beforeAll(async () => {
    // use the 1st stored items we fetch as an example
    const req = httpMocks.createRequest({
      method: 'GET',
    });
    const res = httpMocks.createResponse(req);
    await storeController.getItems(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('item');
        storeditem = body.item[0];
        // store the 2nd item for `delete` testing later
        deleteitem = body.item[1];
        console.log("--- Before Update ---");
        console.log(storeditem);
      });
  });

  var updateditem;

  // lets see the update we did to the 1st item
  afterAll(async () => {
    // use the 1st stored items we fetch as an example
    const req = httpMocks.createRequest({
      method: 'GET',
    });
    const res = httpMocks.createResponse(req);
    await storeController.getItems(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('item');
        updateditem = body.item[0];
        console.log("--- After Update ---");
        console.log(updateditem);
      });
  });

  it('Should successfully create an new item entry', async () => {
    const item = {
      name: "item4",
      description: "for testing",
      filename: "item4.jpg",
      stocks: 5,
      price: 10,
      tag: "drawing",
    }
    const req = httpMocks.createRequest({
      method: 'POST',
      body: item,
    });
    const res = httpMocks.createResponse(req);
    await storeController.addItem(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('ware');
        // rename some of the key fields in JSON passed from res to allow easy comparing
        body.ware.name =  body.ware.itemname;
        delete body.ware.itemname;
        body.ware.filename = body.ware.imagename;
        delete body.ware.imagename;
        expect(body.ware).toMatchObject(item);
      });
  });

  it('Should successfully get all the saved item', async () => {
    const savedItem = {
      itemname: "item4",
      description: "for testing",
      imagename: "item4.jpg",
      stocks: 5,
      price: 10,
      tag: "drawing",
    }
    const req = httpMocks.createRequest({
      method: 'GET',
    });
    const res = httpMocks.createResponse(req);
    await storeController.getItems(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body.success).toBe(true);
        expect(body).toHaveProperty('item');
        // since res is an array of saved item,
        // we just need to ensure our saved item above is in one of them.
        expect.arrayContaining([expect.objectContaining(savedItem)]);

      });
  });

  it('Should successfully update an existing item', async () => {
    const req = httpMocks.createRequest({
      method: 'PUT',
      params: {
        id: storeditem._id
      },
      body: {
        // change price from 10 to 50
        price: 50,
        // change tag from painting to artcraft
        tag: "artcraft",
      }
    });
    const res = httpMocks.createResponse(req);
    await storeController.updateItem(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('msg');
        expect(body.msg).toBe("Updated successfully");
      });
  });

  it('Should successfully update the views of an existing item', async () => {
    const req = httpMocks.createRequest({
      method: 'PUT',
      params: {
        id: storeditem._id
      },
    });
    const res = httpMocks.createResponse(req);
    await storeController.updateViews(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('msg');
        expect(body.msg).toBe("Increment viewer count by 1");
      });
  });

  it('Should successfully delete an existing item', async () => {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: {
        id: deleteitem._id
      },
    });
    const res = httpMocks.createResponse(req);
    await storeController.deleteItem(req, res)
      .then(async () => {
        const body = await res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(body).toHaveProperty('success');
        expect(body).toHaveProperty('message');
        expect(body.success).toBe(true);
        expect(body.message).toBe(`Item with ID: ${deleteitem._id} deleted`);
      });
  });
});