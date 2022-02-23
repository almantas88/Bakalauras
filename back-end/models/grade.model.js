const mongoose = require("mongoose");
const gradeSchema = new mongoose.Schema({
  grade: { type: String, required: true, unique: true}
});
module.exports = Grade = mongoose.model("grade", gradeSchema);
