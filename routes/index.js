const userRoutes = require("./userRoutes");
const tokenRoutes = require("./tokenRoutes");

const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use("/usuarios", userRoutes);
  app.use("/tweets", tweetRoutes);
  app.use("/tokens", tokenRoutes);
};
