const db = require("../config/db");
const transporter = require("../config/mailer");

const sendPaymentReminder = () => {
  const sql = `SELECT 
      user.email AS user_email,
      user.name AS user_name,
      payer.name AS payer_name,
      s.amount,
      e.description
    FROM splits s
    JOIN expenses e ON s.expense_id = e.id
    JOIN users user ON s.user_id =user.id
    JOIN users payer ON e.paid_by = payer.id
    WHERE s.status = 'pending'
    AND s.user_id != e.paid_by`;
  db.query(sql, async (err, results) => {
    if (err) {
      console.log("Reminder query error", err);
      return;
    }
    for (const reminder of results) {
      try {
        await transporter.sendMail({
          to: reminder.user_email,
          subject: `Reminder to pay expense for: ${reminder.description}`,
          html: `
             <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
              <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h1 style="color: #4CAF50;">Splitwise</h1>
                <h3 style="color: #4CAF50;">Reminder to Settle Expense</h3>
                <p style="font-size: 16px; color: #333;">Hello <b>${reminder.user_name}</b>,</p>
                <p style="font-size: 15px; color: #555;">Friendly reminder! You have a shared expense for <b>${reminder.description} From <strong>${reminder.payer_name}</strong> </b>.</p>
                <p style="font-size: 15px; color: #555;">Your share is: <strong>₹${Number(reminder.amount).toFixed(2)}</strong>
</p>
                <a href="the_app_url" style="display: inline-block; background: #0F52BA; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; margin-top: 20px;">Pay Now</a>
              </div>
            </div>
          `,
        });
        console.log(
          "Reminder mail sent successfully to  :",
          reminder.user_email,
        );
      } catch (error) {
        console.error("Error in sending mail :", error);
      }
    }
  });
};

module.exports = sendPaymentReminder;
