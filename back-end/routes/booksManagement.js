const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

//Vaikui išduodamos knygos
router.post("/giveout", async (req, res) => {
  console.log("1", req.body);
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
      if (!mongoose.Types.ObjectId.isValid(id._id)) {
        return res.status(400).json({ msg: "Knyga su netinkamu ID." });
      }
    }

    for (const id of bookIDarr) {
      var foundBook = await Book.findById(id._id);
      if (!foundBook) {
        return res.status(400).json({ msg: "Kažkuri knyga yra nerasta." });
      }
    }

    let result = foundUser.books.map((a) => a.bookId.toString());

    const found = findCommonElement(result, bookIDarr);
    if (found) {
      return res
        .status(400)
        .json({ msg: "Kai kurios knygos jau yra išduotos šiam vartotojui." });
    }
    console.log("4", "ar rasta vienodu", found);

    for (let i = 0; i < bookIDarr.length; i++) {
      console.log(bookIDarr[i]);
      const updatedUser = await User.findOneAndUpdate(
        { cardID: cardID },
        { $push: { books: { bookId: bookIDarr[i]._id, returnDate:bookIDarr[i].returnDate } } }
      );
      console.log(bookIDarr[i]);
    }


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
      if (!mongoose.Types.ObjectId.isValid(id._id)) {
        return res.status(400).json({ msg: "Knyga su netinkamu ID." });
      }
    }

    //Patikrinimas ar knyga egzistuoja tarp knygu
    for (const id of bookIDarr) {
      var foundBook = await Book.findById(id._id);
      if (!foundBook) {
        return res.status(400).json({ msg: "Kažkuri knyga yra nerasta." });
      }
    }

    console.log("1", bookIDarr, foundUser.books);

    const updatedUser = await User.findOneAndUpdate(
      { cardID: cardID },

      { $pull: { books: {bookId : { $in: bookIDarr } }}}

    );

    return res.status(200).json({ msg: "Knygos sėkmingai gražintos atgal." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

function findCommonElement(array1, array2) {
     
  // Loop for array1
  for(let i = 0; i < array1.length; i++) {
       
      // Loop for array2
      for(let j = 0; j < array2.length; j++) {
          // Compare the element of each and
          // every element from both of the
          // arrays
          if(array1[i] === array2[j]._id) {
           
              // Return if common element found
              return true;
          }
      }
  }
   
  // Return if no common element exist
  return false;
}

module.exports = router;
