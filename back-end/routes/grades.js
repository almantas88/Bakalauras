const router = require("express").Router();
const auth = require("../middleware/auth");
const Grade = require("../models/grade.model");

router.get("/allGrades", async (req, res) => {
  try {
    const foundGrades = await Grade.find().sort({grade: 'asc'});
    if (!foundGrades || foundGrades.length <= 0)
      return res.status(400).send({ msg: "Nerasta jokių klasių." });
    return res.status(200).send({
      grades: foundGrades,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/newGrade", async (req, res) => {
  try {

    const existingGrade = await Grade.findOne({ grade: req.body.grade });
    if (existingGrade)
      return res.status(400).json({ msg: "Tokia klasė jau sukurta." });


    const newGrade = new Grade({
      grade: req.body.grade,
    });
    await newGrade.save();
    res.status(200).json({ msg: "Klasė sukurta!", newGrade });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.delete("/deleteGrade/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const existingGrade = await Grade.findOne({ _id: req.params.id });
    if (!existingGrade)
      return res.status(400).json({ msg: "Nera tokios klasės." });

      await Grade.deleteOne({ _id: req.params.id });
    
    res.status(200).json({ msg: "Klasė ištrinta!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
