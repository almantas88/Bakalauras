const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const Book = require("../models/book.model");

//Mokiniu registracija, veliau reiktu gal padaryti ir admino registracija, bet kaip atskira route.
// Register
router.post("/register", auth, async (req, res) => {
  try {
    let {
      email,
      password,
      passwordCheck,
      firstName,
      lastName,
      cardID,
      grade,
      role,
    } = req.body;
    // validate
    if (!firstName || !lastName || !cardID || !grade) {
      console.log(email, password, passwordCheck, firstName, lastName, cardID);
      return res.status(400).json({ msg: "Ne visi laukai buvo užpildyti." });
    }
    if (password && password.length < 5)
      return res
        .status(400)
        .json({ msg: "Slaptažodis turi būti bent 5 raidžių ilgio." });
    if (password && passwordCheck && password !== passwordCheck)
      return res.status(400).json({ msg: "Slaptažodžiai nesutampa." });

    const existingCardID = await User.findOne({ cardID: cardID });
    if (existingCardID)
      return res
        .status(400)
        .json({ msg: "Vartotojas su tokiu kortelės ID jau egzistuoja." });

    if (email) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "Vartotojas su tokiu el. paštu jau egzistuoja." });
    }
    var newUser;
    if (email && password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      newUser = new User({
        email,
        password: passwordHash,
        firstName,
        lastName,
        cardID,
        grade,
        role,
      });
    } else {
      newUser = new User({
        firstName,
        lastName,
        cardID,
        grade,
        role,
      });
    }

    const savedUser = await newUser.save();
    res.status(200).json({ msg: "Vartotojas sukurtas!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).send({ msg: "Ne visi laukai buvo užpildyti." });
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .send({ msg: "Nėra tokio vartotojo su tokiu el. paštu." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).send({ msg: "Netinkami prisijungimo duomenys." });
    const token = jwt.sign(
      {
        id: user._id,
        cardID: user.cardID,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        grade: user.grade,
      },
      process.env.JWT_SECRET, { expiresIn: '8h' }
    );
    res.status(200).send({
      token,
      user: {
        cardID: user.cardID,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        grade: user.grade,
      },
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// Delete
// cia butinai reiks dar patikrinti ar dar neliko pas ji knygu, jeiguy dar turi kad neleistu istrinti
router.delete("/deleteUser", auth, async (req, res) => {
  try {
    console.log(req.body);
    const existingCard = await User.findOne({ cardID: req.body.cardID });
    if (!existingCard)
      return res
        .status(400)
        .json({ msg: "Nera tokio vaiko su tokia kortelės ID." });

    const deletedUser = await User.deleteOne({ cardID: req.body.cardID });
    console.log(deletedUser);
    res.json({ msg: "Vartotojas sėkmingai ištrintas!" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
  });
});

router.get("/allUsers", auth, async (req, res) => {
  try {
    // const allUsers = await User.find({ role: { $ne: "ADMIN" }}, 'email firstName lastName cardID role grade books').sort({
    //   grade: "asc",
    // });
    const allUsers = await User.aggregate([
      { $match: { role: { $ne: "ADMIN" } } },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          cardID: 1,
          role: 1,
          grade: 1,
          booksLength: {
            $size: {
              $cond: [{ $isArray: "$books" }, "$books", []],
            },
          },
        },
      },
    ]).sort({
      grade: "asc",
    });
    return res.status(200).send({
      users: allUsers,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/oneUser", async (req, res) => {
  try {
    const foundUser = await User.findOne({ cardID: req.body.cardID });
    if (!foundUser)
      return res.status(400).send({ msg: "Vartotojas neegzistuoja" });
    return res.status(200).send({
      user: foundUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/oneUserWithAllBooks", async (req, res) => {
  console.log(req.body);

  try {
    var user = {};
    const foundUser = await User.findOne({ cardID: req.body.cardID }).populate({
      path: "books.bookId",
    });
    if (!foundUser)
      return res.status(400).send({ msg: "Vartotojas neegzistuoja" });

    user = {
      _id: foundUser._id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      cardID: foundUser.cardID,
      role: foundUser.role,
      grade: foundUser.grade,
    };

    console.log(foundUser);
    var bookArr = [];
    foundUser.books.forEach((element) => {
      console.log(element);
      bookArr.push({
        _id: element.bookId._id,
        title: element.bookId.title,
        author: element.bookId.author,
        description: element.bookId.description,
        bookID: element.bookId.bookID,
      });
    });
    // man atroDo čia reikia formuoti duomenis

    user.books = bookArr;

    return res.status(200).send({
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.put("/updateUser", auth, async (req, res) => {
  try {
    console.log(req.body);
    let {
      initialCardID,
      email,
      firstName,
      lastName,
      cardID,
      grade,
      password,
      passwordCheck,
    } = req.body;

    if (!firstName || !lastName || !cardID || !grade) {
      return res.status(400).json({ msg: "Ne visi laukai buvo užpildyti." });
    }
    const foundUser = await User.findOne({ cardID: req.body.initialCardID });
    if (!foundUser)
      return res.status(400).send({ msg: "Vartotojas neegzistuoja" });

    var newUserInfo;
    if (foundUser.email === email) {
      newUserInfo = {
        firstName,
        lastName,
        cardID,
        grade,
      };
    } else if (email) {
      const foundUserEmail = await User.findOne({ email: email });
      if (foundUserEmail)
        return res
          .status(400)
          .send({ msg: "Vartotojas su tokiu el. paštu egzistuoja" });

      newUserInfo = {
        email,
        firstName,
        lastName,
        cardID,
        grade,
      };
    }

    //Patikrina ar išviso yra slaptažodis, nes gali jo ir neupdatinti
    if (password && passwordCheck) {
      if (password !== passwordCheck) {
        return res.status(400).json({ msg: "Slaptažodžiai nesutampa." });
      }
      if (password.length < 5)
        return res
          .status(400)
          .json({ msg: "Slaptažodis turi būti bent 5 raidžių ilgio." });

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      newUserInfo.password = passwordHash;
    }

    const updatedUser = await User.findOneAndUpdate(
      { cardID: req.body.initialCardID },
      newUserInfo
    );

    return res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
