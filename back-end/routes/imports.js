const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const csv = require("csvtojson");
var path = require("path");

router.post("/userImport", async (req, res) => {
  const { myFile } = req.files;
  // console.log(myFile.data.toString("utf-8"));
  // console.log(myFile);

  if (path.extname(myFile.name) !== ".csv")
    return res
      .status(400)
      .json({ msg: "Netinkamas failo tipas, naudokite .csv" });

  const jsonArray = await csv({
    delimiter: ";",
  }).fromString(myFile.data.toString("utf-8"));

  //console.log(jsonArray);

  var arrayToInsert = [];
  var arrayOfCardID = [];
  await csv({
    delimiter: ";",
  })
    .fromString(myFile.data.toString("utf-8"))
    .then((source) => {
      // Fetching the all data from each row
      for (var i = 0; i < source.length; i++) {
        console.log(source[i]);

        //   const foundUser = await User.findOne({ cardID: req.body.initialCardID });
        // if (foundUser)
        // return res.status(400).send({ msg: "Vartotojas egzistuoja" });

        var oneRow = {
          cardID: source[i]["Kortelės ID"],
          firstName: source[i]["Vardas"],
          lastName: source[i]["Pavardė"],
          grade: source[i]["Klasė"],
        };
        arrayToInsert.push(oneRow);
        arrayOfCardID.push(source[i]["Kortelės ID"]);
      }
      console.log(arrayToInsert);
      console.log(arrayOfCardID);
    });

  //const docs = await User.find({cardID: { $in: arrayOfCardID }});
  //const records = await User.find({ 'cardID': { $in: arrayOfCardID } });
  //console.log(records);

  // try {
  //   await User.insertMany(arrayToInsert);
  // } catch (error) {
  //   return res.status(400).json({msg: error });
  // }

  await User.insertMany(arrayToInsert)
    .then(function () {
      return res.status(200).json({ jsonArray });
    })
    .catch(function (error) {
      console.log(error);
      return res.status(400).json({ msg: "Klaida importuojant vartotojus!" });
    });

  
});

module.exports = router;
