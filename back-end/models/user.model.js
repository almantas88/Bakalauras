const mongoose = require("mongoose");
const moment = require("moment");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  cardID: { type: String, required: true, unique: true },
  role: { type: String, default: "STUDENT" },
  grade: { type: String, required: true, default: "-" },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        unique: true,
      },
      dateGiveOut: { type: Date, default: moment().format()  },
    },
  ],
});
var User = mongoose.model("user", userSchema);
module.exports = User;
