const expenseModel = require("../Model/expenseModel");
const transporter = require("../config/mailer");

const fromEmail = process.env.USER_EMAIL;

const createExpense = async (req, res) => {
  try {
    const { description, amount, members, split_type } = req.body;
    const paid_by = req.user.id;
    const payerId = Number(paid_by);

    let memberId = [];

    if (split_type === "equal") {
      memberId = members;
    } else {
      memberId = members.map((member) => member.user_id);

      const totalPercentage = members.reduce(
        (sum, member) => sum + Number(member.percentage),
        0,
      );

      if (totalPercentage !== 100) {
        return res.status(400).json({
          error: "Total percentage must equal 100",
        });
      }
    }

    if (!memberId.includes(payerId)) {
      return res.status(400).json({
        error: "Payer must be part of split",
      });
    }

    const expenseResult = await expenseModel.createExpense(
      description,
      amount,
      paid_by,
    );

    const expenseId = expenseResult.insertId;

    await expenseModel.createSplits(expenseId, members, split_type, amount);

    const userData = await expenseModel.findUsersById(memberId);

    const payerName =
      userData.find((u) => u.id === payerId)?.name || "A friend";

    userData.forEach((user) => {
      if (user.id !== payerId) {
        let splitAmount = 0;

        if (split_type === "equal") {
          splitAmount = amount / members.length;
        } else {
          const member = members.find((m) => m.user_id === user.id);

          splitAmount = ((member?.percentage || 0) / 100) * amount;
        }

        transporter.sendMail({
          from: `Splitwise <${fromEmail}>`,
          to: user.email,
          subject: `New Expense: ${description}`,
          html: `
       <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
              <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h1 style="color: #4CAF50;">Splitwise</h1>
                <h3 style="color: #4CAF50;">New Expense</h3>
                <p style="font-size: 16px; color: #333;">Hello <b>${user.name}</b>,</p>
                <p style="font-size: 15px; color: #555;"><strong>${payerName}</strong> added a new expense: <b>${description}</b>.</p>
                <p style="font-size: 15px; color: #555;">Your share is: <strong>₹${splitAmount.toFixed(2)}</strong></p>
                <a href="the_app_url" style="display: inline-block; background: #0F52BA; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; margin-top: 20px;">Pay Now</a>
              </div>
            </div>
      `,
        });
      }
    });

    return res.status(201).json({
      message: "Expense saved successfully",
      expenseId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { createExpense };
