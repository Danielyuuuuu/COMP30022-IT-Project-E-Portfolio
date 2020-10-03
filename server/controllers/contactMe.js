const ContactMe = require("../models/contactMe");

const getContactMe = async (req, res) => {
  ContactMe.find()
    .sort({ date: -1 })
    .then((contactMe) => res.json(contactMe))
    .catch((err) => res.status(400).json("Error" + err));
};

const addContactMe = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.subject ||
      !req.body.message
    ) {
      return res.status(400).json({ msg: "Need to fill in all fields" });
    }
    const contactMe = new ContactMe({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    contactMe
      .save()
      .then((res) => {
        res.status(200).json({
          success: true,
          res,
        });
      })
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteContactMe = async (req, res) => {
  ContactMe.findByIdAndDelete({ _id: req.params.id })
    .then((contactMe) =>
      res.json({ mgs: "Contact me have been deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "no such contact me" }));
};

module.exports = { getContactMe, addContactMe, deleteContactMe };
