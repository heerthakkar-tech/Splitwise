const db = require("../config/db");

const getDashboardData = (userId, callback) => {
  const totalOwedToYouSql = `
    SELECT SUM(s.amount) as total
    FROM splits s
    JOIN expenses e ON s.expense_id = e.id
    WHERE e.paid_by = ?
    AND s.user_id != ?
    AND s.status = 'pending'
  `;

  const totalYouOweSql = `
    SELECT SUM(s.amount) as total
    FROM splits s
    JOIN expenses e ON s.expense_id = e.id
    WHERE s.user_id = ?
    AND e.paid_by != ?
    AND s.status = 'pending'
  `;

  const owedToYouListSql = `
    SELECT 
      u.id,
      u.name,
      SUM(s.amount) as amount
    FROM splits s
    JOIN expenses e ON s.expense_id = e.id
    JOIN users u ON s.user_id = u.id
    WHERE e.paid_by = ?
    AND s.user_id != ?
    AND s.status = 'pending'
    GROUP BY u.id, u.name
  `;

  const youOweListSql = `
    SELECT
      u.id,
      u.name,
      SUM(s.amount) as amount
    FROM splits s
    JOIN expenses e ON s.expense_id = e.id
    JOIN users u ON e.paid_by = u.id
    WHERE s.user_id = ?
    AND e.paid_by != ?
    AND s.status = 'pending'
    GROUP BY u.id, u.name
  `;

  db.query(totalOwedToYouSql, [userId, userId], (err, total1) => {
    if (err) return callback(err);

    db.query(totalYouOweSql, [userId, userId], (err, total2) => {
      if (err) return callback(err);

      db.query(owedToYouListSql, [userId, userId], (err, owedList) => {
        if (err) return callback(err);

        db.query(youOweListSql, [userId, userId], (err, oweList) => {
          if (err) return callback(err);

          callback(null, {
            totals: {
              totalOwedToYou: total1[0].total || 0,
              totalYouOwe: total2[0].total || 0,
              netBalance: (total1[0].total || 0) - (total2[0].total || 0),
            },
            id: userId,
            owedToYou: owedList,
            youOwe: oweList,
          });
        });
      });
    });
  });
};

module.exports = { getDashboardData };
