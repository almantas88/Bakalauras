const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const csv = require("csvtojson");
var path = require("path");

router.post("/userImport", async (req, res) => {
  const { myFile } = req.files;
  console.log(myFile.data.toString("utf-8"));
  console.log(myFile);

  if (path.extname(myFile.name) !== ".csv")
    return res.status(400).json({ msg: "Invalid file type" });

  const jsonArray = await csv({
    delimiter: ";",
  }).fromString(myFile.data.toString("utf-8"));

  //Check csv file header
  if (
    !jsonArray[0].hasOwnProperty("vardas") &&
    !jsonArray[0].hasOwnProperty("pavarde") &&
    !jsonArray[0].hasOwnProperty("klase")
  ) {
    console.log(!jsonArray[0].hasOwnProperty("vardas") &&
    !jsonArray[0].hasOwnProperty("pavarde") &&
    !jsonArray[0].hasOwnProperty("klase"))
    return res
      .status(400)
      .json({ msg: "Kažkas blogai su csv failo formatavimu" });
  }
  console.log(jsonArray[0].hasOwnProperty("vardas"))
  console.log(jsonArray);

  return res.status(200).json({ jsonArray });

  //   var arrayToInsert = [];
  //   csv({
  //     delimiter: ';',
  //   })
  //     .fromFile("./routes/public/data/" + myFile.name)
  //     .then((source) => {
  //       // Fetching the all data from each row
  //       for (var i = 0; i < source.length; i++) {
  //         console.log(source[i]);
  //         var oneRow = {
  //           vardas: source[i]["vardas"],
  //           pavarde: source[i]["pavarde"],
  //           klase: source[i]["klase"],
  //         };
  //         arrayToInsert.push(oneRow);
  //       }
  //       console.log(arrayToInsert);
  //     });
});

module.exports = router;
