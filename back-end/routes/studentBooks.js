const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");

router.get("/books", auth,  async (req, res) => {
console.log(req.user);
try {
    const foundUser = await User.findOne({ _id: req.user }).populate('books')
    if (!foundUser)
      return res.status(400).send({ msg: "Vartotojas neegzistuoja" });
    return res.status(200).send({
      books: foundUser.books,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
module.exports = router;
