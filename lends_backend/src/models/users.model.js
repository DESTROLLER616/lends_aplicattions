// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function (app) {
  const modelName = "users";
  const mongooseClient = app.get("mongooseClient");
  const schema = new mongooseClient.Schema(
    {
      fullname: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
      },
      telephone: {
        type: Number,
      },
      password: {
        type: String,
      },
      business: {
        type: String,
        ref: "business",
      },
      address: {
        street: {
          type: String,
        },
        city: {
          type: String,
        },
        postal_code: {
          type: String,
        },
      },

      googleId: {
        type: String,
      },

      facebookId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
