const User = require("./models/user.model");
const bcrypt = require("bcryptjs");


async function createAdmin() {
    try {
const password = "admin";
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({
        email: "admin@gmail.com",
        firstName: "admin",
        lastName: "admin",
        password: passwordHash,
        cardID: "admin",
        role: "ADMIN"
      });
      user.save();
    } catch (err) {
      console.log(err);
    }
  }
    
module.exports = createAdmin;
