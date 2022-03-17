const router = require("express").Router();
const auth = require("../middleware/auth");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const CsvUpload = require("express-fileupload");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });
const csv = require("csvtojson");
const fs = require("fs");

router.post("/userImport", async (req, res) => {
  const { myFile } = req.files;
  //myFile.mv(__dirname + "/public/data/" + myFile.name);
  console.log(myFile.data.toString('utf-8'));

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

  const jsonArray = await csv({
    delimiter: ";",
  }).fromString(myFile.data.toString('utf-8'));

  console.log(jsonArray);

  return res.status(200).json({ jsonArray });
});

module.exports = router;
