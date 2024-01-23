const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

app.use(cors());
const port = 8000;
mongoose.connect(
  "mongodb+srv://broomees:broomees123@cluster0.yjul47o.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
app.use(bodyParser.json());
app.post("/submit-form", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, confirmPassword } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    await newUser.save();

    return res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
