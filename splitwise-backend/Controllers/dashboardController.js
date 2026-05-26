const dashboardModel = require("../Model/dashboardModel");

const getDashboard = (req, res) => {
  try {
    const userId = req.user.id;

    dashboardModel.getDashboardData(userId, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message || err });
      }

      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboard };
