require("dotenv").config();
const express = require("express");
require("./jobs/reminderJob");
const cors = require("cors");

const authRoutes = require("./Routes/auth");
const userRoutes = require("./Routes/userRoute");
const expenseRoutes = require("./Routes/expenseRoute");
const dashboardRoutes = require("./Routes/dashboardRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
app.use("/api", dashboardRoutes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
