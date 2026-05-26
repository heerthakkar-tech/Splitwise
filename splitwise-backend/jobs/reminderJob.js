const cron = require("node-cron");
const sendPaymentReminder = require("../services/reminderServices");

//Runs every minute
// cron.schedule("0 17 * * 2", () => {
//   console.log("Running a task every minute"); //This every minitue only for testing for evry 24 hours we can write 0 0 * * *
//   sendPaymentReminder();
// });
