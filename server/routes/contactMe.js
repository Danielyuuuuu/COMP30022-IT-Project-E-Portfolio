const express = require("express");
const contactMeRouter = express.Router();

const contactMeController = require("../controllers/contactMe");

contactMeRouter.get("/getContactMe", contactMeController.getContactMe);

contactMeRouter.post("/addContactMe", contactMeController.addContactMe);

contactMeRouter.delete(
  "/deleteContactMe/:id",
  contactMeController.deleteContactMe
);

module.exports = contactMeRouter;
