const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = function (app) {
  mongoose.connect(process.env.MONGODB).catch((err) => {
    logger.error(err);
    process.exit(1);
  });

  app.set("mongooseClient", mongoose);
};
