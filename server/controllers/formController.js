
const User = require("../models/user");

const formController = {
  submitForm: async (req, res) => {
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
  },
};

module.exports = formController;
