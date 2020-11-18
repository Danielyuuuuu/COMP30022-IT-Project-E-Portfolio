const mongoose = require("mongoose");
const Item = require("../models/item");
// const mongo_url = require("../models/db").mongo_url;
//
// const connect = mongoose.createConnection(mongo_url, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
//
// let gfs;
// connect.once("open", () => {
//   // initialize stream
//   gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//     bucketName: "uploads", // must be identical to the GridFsStorage bucketName in db.js
//   });
// });

const getItems = async (req, res) => {
  await Item.find()
    .then((wares) => {
      res.status(200).json({
        success: true,
        item: wares,
      });
    })
    .catch((err) => res.status(400).json({ nowaresfound: "No items found" }));
};

// the request body will have the form of:
// {
//   "tags" :["painting","fruit",...], //ensure tags must have something
//   "filter": "popular" (/ latest)
// }
// return the items with at least 1 match with the query.
// this basically handles category and filter as well.
const getSpecificItems = async (req, res) => {
  const tags = req.body.tags;
  const filter = req.body.filter;
  var sortkey;
  if (filter == "popular") {
    sortkey = "views";
  } else if (filter == "latest") {
    sortkey = "upload_date";
  } else {
    res.status(400).json({ error: "Invalid filter / filter does not exist" });
  }
  console.log(tags);
  Item.find({ tag: { $in: tags } })
    .sort({ [sortkey]: -1 }) // -1 means most recent
    .then((wares) => {
      res.status(200).json({
        success: true,
        specific_items: wares,
      });
    })
    .catch((err) => res.status(400).json(err));
};

const addItem = async (req, res) => {
  try {
    const ware = new Item(req.body);
    await ware
      .save()
      .then((ware) => {
        res.status(200).json({
          success: true,
          ware,
        });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteItem = async (req, res) => {
  await Item.findOne({ _id: req.params.id })
    .then(async (item) => {
      if (item) {
        await Item.deleteOne({ _id: req.params.id })
          .then(() => {
            return res.status(200).json({
              success: true,
              message: `Item with ID: ${req.params.id} deleted`,
            });
          })
          .catch((err) => {
            return res.status(400).json(err);
          });
      } else {
        return res.status(400).json({
          success: false,
          message: "Item not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

// const renderImg = async (req, res) => {
//   gfs.find({ filename: req.params.filename }).toArray((err, files) => {
//     if (!files[0] || files.length === 0) {
//       return res.status(200).json({
//         success: false,
//         message: "No files available",
//       });
//     }
//     if (
//       files[0].contentType === "image/jpg" ||
//       files[0].contentType === "image/jpeg" ||
//       files[0].contentType === "image/png" ||
//       files[0].contentType === "image/svg+xml"
//     ) {
//       // render image to browser
//       gfs.openDownloadStreamByName(req.params.filename).pipe(res);
//     } else {
//       res.status(404).json({
//         err: "Not an image",
//       });
//     }
//   });
// };

// currently only work when req.body is in x-www-form-uelencoded format
// rather than form-data like post new item.
// maybe solved when implement react side, not sure ...
const updateItem = async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((item) => res.json({ msg: "Updated successfully" }))
    .catch((err) => res.status(400).json(err));
};

const updateViews = async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
    .then(() => res.json({ msg: "Increment viewer count by 1" }))
    .catch((err) => res.status(400).json(err));
};

// currently update a single artwork stock only.
const updateStocks = async (req, res) => {
  var id = req.body.id;
  var artwork_bought = req.body.nbought;
  Item.findByIdAndUpdate(req.params.id, {
    $subtract: ["stocks", [artwork_bought]],
  })
    .then(() => res.json({ msg: "Updated artwork stock" }))
    .catch((err) => res.status(400).json(err));
};

// this version works for a single http communication
// takes a JSON files which specifies an array of IDs and their quantity bought
// {
//   "items": [
//       {
//         "_id": "248798214987",
//         "quantity": 1,
//       },
//       {
//         "_id": "12849287498174",
//         "quantity": 3,
//       },
//   ]
// }
// update all the corresponding artworks stocks in one go.
// stock validation should be done on frontend !!
const updateMultiStocks = async (req, res) => {
  var itemList = req.body.items;
  console.log(itemList);
  var bulkUpdateCallback = (err, r) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({
        matchedCount: r.matchedCount,
        modifiedCount: r.modifiedCount,
      });
    }
  };
  var bulkOps = itemList.map((item) => {
    return {
      updateOne: {
        filter: { _id: mongoose.Types.ObjectId(item._id) },
        update: { $inc: { stocks: -item.quantity } },
      },
    };
  });
  Item.collection.bulkWrite(
    bulkOps,
    { ordered: true, w: 1 },
    bulkUpdateCallback
  );
};

module.exports = {
  getItems,
  getSpecificItems,
  addItem,
  deleteItem,
  updateItem,
  updateViews,
  updateStocks,
  updateMultiStocks,
};
