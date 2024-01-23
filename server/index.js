const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const formController = require("./controllers/formController");

const app = express();
const port = 8000;

app.use(cors());
mongoose.connect("mongodb+srv://broomees:broomees123@cluster0.yjul47o.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.post("/submit-form", formController.submitForm);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
