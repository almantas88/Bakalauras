const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const moment = require("moment");
moment().format("LT");

router.get("/books", auth, async (req, res) => {
  console.log(req.user);
  try {
    moment().format("LT");
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
        dateTaken: moment(element.dateGiveOut).format("YYYY-MM-DD"),
        returnDate: moment(element.returnDate).format("YYYY-MM-DD"),
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

router.post("/passwordChange", auth, async (req, res) => {
  console.log(req.user);
  console.log(req.body);

  let { newPassword, newPasswordRepeat, oldPassword } = req.body;
  if (!newPassword || !newPasswordRepeat || !oldPassword) {
    return res.status(400).json({ msg: "Ne visi laukai buvo užpildyti." });
  }

  if (newPassword.length < 5 || newPasswordRepeat.length < 5) {
    return res
      .status(400)
      .json({ msg: "Slaptažodis turi būti bent 5 raidžių ilgio." });
  }

  if (newPassword !== newPasswordRepeat) {
    return res.status(400).json({ msg: "Nauji slaptažodžiai nesutampa." });
  }

  const user = await User.findOne({ _id: req.user });
  console.log(user);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  console.log(isMatch);
  if (!isMatch)
  return res.status(400).send({ msg: "Netinkamas senas slaptažodis." });

  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const existingCardID = await User.updateOne({ _id: req.user }, { password: passwordHash });
    res.status(200).json({ msg: "Slaptažodis sėkmingai atnaujintas." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
