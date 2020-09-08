// const mongoose = require('mongoose');
//
// const dbHandler = require('./db-handler');
// const bookController = require('../controllers/book');
// const bookModel = require('../models/book');
//
// /**
//  * Connect to a new in-memory database before running any tests.
//  */
// beforeAll(async () => await dbHandler.connect());
//
// /**
//  * Clear all test data after every test.
//  */
// afterEach(async () => await dbHandler.clearDatabase());
//
// /**
//  * Remove and close the db and server.
//  */
// afterAll(async () => await dbHandler.closeDatabase());

const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const bookController = require('../controllers/book');

let mockDatabase;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

beforeAll(async () => {
    mockDatabase = new MongoMemoryServer();
    const dbUri = await mockDatabase.getConnectionString();
    await mongoose.connect(dbUri, options, (err) => {
        if (err) console.error(err);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mockDatabase.stop();
});

/**
 * Product test suite.
 */
describe('book ', () => {
    jest.setTimeout(30000);
    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: bookComplete
        });
        const res = httpMocks.createResponse(req);
        await bookController.addBook(req, res).then(async () => {
            const body = await res._getData();
            expect(res.statusCode).toBe(201);
            expect(body).toHaveProperty('book');
        })
    });
});

/**
 * Complete book example.
 */
const bookComplete = {
    title: 'The Little Prince',
    isbn: "31428571",
    author: 'John Smith',
    description: 'nice story book'
};