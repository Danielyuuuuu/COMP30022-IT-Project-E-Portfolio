const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.render("welcome");
});

module.exports = router;
