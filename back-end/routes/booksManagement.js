const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

//Vaikui išduodamos knygos
router.post("/giveout", async (req, res) => {
  console.log(req.body);
  try {
    let { cardID, bookIDarr } = req.body;

    if (!cardID || !bookIDarr)
      return res.status(400).json({ msg: "Ne visi laukai buvo užpildyti." });

    if (bookIDarr.length <= 0)
      return res.status(400).json({ msg: "Nėra knygų išdavimui." });

    const foundUser = await User.findOne({ cardID: req.body.cardID });
    if (!foundUser)
      return res.status(400).json({ msg: "Nėra tokio vartotojo." });

    for (const id of bookIDarr) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Knyga su netinkamu ID." });
      }
    }

    for (const id of bookIDarr) {
      var foundBook = await Book.findById(id);
      if (!foundBook) {
        return res.status(400).json({ msg: "Kažkuri knyga yra nerasta." });
      }
    }

    console.log(bookIDarr, foundUser.books);
    console.log(
      "patikrinimas ar gereai veikia objectid",
      mongoose.Types.ObjectId(bookIDarr[0])
    );

    const found = bookIDarr.some((r) =>
      foundUser.books.includes(mongoose.Types.ObjectId(r))
    );
    if (found) {
      return res
        .status(400)
        .json({ msg: "Kai kurios knygos jau yra išduotos šiam vartotojui." });
    }
    console.log("ar rasta vienodu",found);

    const updatedUser = await User.findOneAndUpdate(
      { cardID: cardID },

      { $push: { books: bookIDarr } }
    );

    console.log("kas cia vyksta", updatedUser);

    return res.status(200).json({ msg: "Knygos sėkmingai išduotos." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Vaikas gražina knygas
router.post("/return", async (req, res) => {
  try {
    let { cardID, bookIDarr } = req.body;

    if (!cardID || !bookIDarr)
      return res.status(400).json({ msg: "Ne visi laukai buvo užpildyti." });

    if (bookIDarr.length <= 0)
      return res.status(400).json({ msg: "Nėra knygų išdavimui." });

    const foundUser = await User.findOne({ cardID: req.body.cardID });
    if (!foundUser)
      return res.status(400).json({ msg: "Nėra tokio vartotojo." });

    for (const id of bookIDarr) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Knyga su netinkamu ID." });
      }
    }

    for (const id of bookIDarr) {
      var foundBook = await Book.findById(id);
      if (!foundBook) {
        return res.status(400).json({ msg: "Kažkuri knyga yra nerasta." });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { cardID: cardID },

      { $pull: { books: { $in: bookIDarr } } }
    );

    return res.status(200).json({ msg: "Knygos sėkmingai gražintos atgal." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
module.exports = router;
