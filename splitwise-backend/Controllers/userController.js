const userModel = require("../Model/userModel");

const getUsers = (req, res) => {
  userModel.getAllUsers((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json(result);
  });
};

module.exports = { getUsers };
