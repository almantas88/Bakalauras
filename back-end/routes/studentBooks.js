const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const moment = require("moment");
moment().format('LT');  

router.get("/books", auth, async (req, res) => {
  console.log(req.user);
  try {
    moment().format('LT');  
    const foundUser = await User.findOne({ _id: req.user }).populate(
      "books.bookId"
    );
    if (!foundUser)
      return res.status(400).send({ msg: "Vartotojas neegzistuoja" });

    var booksArr = [];
    foundUser.books.forEach((element) => {
      console.log(element);
      booksArr.push({
        _id: element.bookId._id,
        title: element.bookId.title,
        author: element.bookId.author,
        description: element.bookId.description,
        bookID: element.bookId.bookID,
        dateTaken: moment(element.dateGiveOut).format('YYYY-MM-DD'),
        returnDate: moment(element.returnDate).format('YYYY-MM-DD'),
      });
    });
    // man atroDo čia reikia formuoti duomenis

    console.log(booksArr);

    return res.status(200).send({
      booksArr,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
module.exports = router;
