const db = require("../config/db");

const createExpense = async (description, amount, paid_by) => {
  const [result] = await db
    .promise()
    .query(
      "INSERT INTO expenses (description, amount, paid_by) VALUES (?, ?, ?)",
      [description, amount, paid_by],
    );

  return result;
};

const createSplits = async (expenseId, members, split_type, amount) => {
  const splitPromises = members.map((member) => {
    let userId;
    let splitAmount;
    let percentage = null;

    if (split_type === "equal") {
      userId = member;
      splitAmount = amount / members.length;
    } else {
      userId = member.user_id;
      percentage = member.percentage;
      splitAmount = (percentage / 100) * amount;
    }

    return db
      .promise()
      .query(
        "INSERT INTO splits (expense_id, user_id, amount, percentage) VALUES (?, ?, ?, ?)",
        [expenseId, userId, splitAmount, percentage],
      );
  });

  return Promise.all(splitPromises);
};

const findUsersById = async (memberIds) => {
  const [users] = await db
    .promise()
    .query("SELECT name, email, id FROM users WHERE id IN (?)", [memberIds]);

  return users;
};

module.exports = {
  createExpense,
  createSplits,
  findUsersById,
};
