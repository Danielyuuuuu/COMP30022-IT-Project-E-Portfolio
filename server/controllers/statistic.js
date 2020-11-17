const mongoose = require("mongoose");
const Statistic = require("../models/statistic");

const Grid = require("gridfs-stream");

//require the js
const db = require("../models/db");
//require the var
const conn = db.db;

//init gfs
var gfs;


const getStatistic = async (req, res) => {
    await Statistic.find()
        .then((wares) => {
            res.status(200).json({
                success: true,
                statistic: wares,
            });
        })
        .catch((err) => res.status(400).json({ nowaresfound: "No statistic information found" }));
};

const addStatistic = async (req, res) => {
    try {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        const statistic = new Statistic(
            {
                date: today,
            }
        );
        const saveStatistic = await statistic.save();
        return res.json(saveStatistic);
    } catch (err) {
        res.status(400).send(err);
    }
};


const getStatisticInfo = async () =>{

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    console.log("Counting Database Statistic Informations...")
    var numFiles = await gfs.files.count();
    console.log("Files: ", numFiles);

    var items = db.db.db.collection("items");
    var numItems= await items.find().count();
    console.log("Items: ", numItems);

    var blogs = db.db.db.collection("blogs");
    var numBlogs= await blogs.find().count();
    console.log("Blogs: ", numBlogs);

    var contactMes = db.db.db.collection("contactmes");
    var numContactMes=await contactMes.find().count();
    console.log("Contact Mes: ", numContactMes);

    return {
        numFiles: numFiles,
        numItems: numItems,
        numBlogs: numBlogs,
        numContactMes: numContactMes,
    };
}

const updateStatistic = async (req, res) => {
    var a = await getStatisticInfo();
    // console.log("test: ",a[0], a[1], a[2], a[3]);

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    const filter = {
        "date": today,
    }

    var tmp = await Statistic.findOne(filter);

    var viewN;
    if (!tmp){
        
        viewN = 1;
    }else{
        viewN = tmp.viewsNumber;
    }
    console.log("views number:", viewN);

    const newS = {
        blogNumber: a.numBlogs,
        storeNumber: a.numItems,
        messageNumber: a.numContactMes,
        mediaNumber: a.numFiles,
        viewsNumber: viewN,
    }

    try {
        // upsert is true, so if the category or subcat is not found, it will
        // automatically create a new entry.
        await Statistic.findOneAndUpdate(filter, newS, { upsert: true }, (err, doc) => {
            if (err) return res.status(401).json(err);
            return;
        })
    } catch (error) {
        res.status(402).json(error);
    }
};

const updateViews = async (req, res) => {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    const filter = {
        "date": today,
    }
    await Statistic.findOneAndUpdate(filter, { $inc: { viewsNumber: 1 } })
        .then((r) => res.json(r))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
    getStatistic,
    updateStatistic,
    updateViews,
    addStatistic,
};
