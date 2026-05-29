const dashboardModel = require("../Model/dashboardModel");
const redisClient = require("../config/redis");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const cacheKey = `dashboard:${userId}`;

    // check redis first
    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      console.log("Redis hit");
      return res.status(200).json(JSON.parse(cacheData));
    }

    console.log("Redis miss");
    console.log("cacheKey", cacheKey);

    dashboardModel.getDashboardData(userId, async (err, data) => {
      if (err) {
        return res.status(500).json({
          error: err.message || err,
        });
      }

      // store data in redis for 30 sec
      await redisClient.set(cacheKey, JSON.stringify(data), {
        EX: 30,
      });

      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { getDashboard };
