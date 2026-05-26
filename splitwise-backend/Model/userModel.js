const db = require("../config/db");

const getAllUsers = (callback) => {
  db.query("SELECT id, name, email FROM users", callback);
};

module.exports = { getAllUsers };
