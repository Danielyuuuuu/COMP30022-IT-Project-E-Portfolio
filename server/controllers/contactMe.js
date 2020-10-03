const ContactMe = require("../models/contactMe");

const getContactMe = async (req, res) => {
  ContactMe.find()
    .sort({ date: -1 })
    .then((contactMe) => res.json(contactMe))
    .catch((err) => res.status(400).json("Error" + err));
};

const addContactMe = async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: "Need to fill in all fields..." });
    }
    const contactMe = new ContactMe({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
    const savedContactMe = await contactMe.save();
    return res.json(savedContactMe);
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
