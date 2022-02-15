const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const seed = require('./seed');
const seedbook = require('./seedBooks');
const path = require("path");

app = express();
app.use(express.json());

app.use(cors());
require("dotenv").config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();
//seed(1000);
//seedbook(1000);
app.use("/api/users", require("./routes/users"));
app.use("/api/books", require("./routes/books"));
app.use("/api/booksmanagement", require("./routes/booksManagement"));
app.use("/api/students", require("./routes/studentBooks"));

// deployment

const __dirname1 = path.resolve();
if(process.env.NODE_ENV=== 'production'){


  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  console.log(path.join(__dirname, "../frontend/build"));

  console.log(path.join(__dirname, "../frontend", "build", "index.html"));

  app.get("*", (req, res) => {
    //res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))

    const index = path.join(__dirname, "../frontend", "build", "index.html");
    res.sendFile(index);
  })


}
else{

}

// deployment

app.listen(process.env.PORT || 5000, () => {
  console.log(`back-end server is running on port ${process.env.PORT}`);
});
