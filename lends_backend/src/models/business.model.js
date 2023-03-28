// business-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "business";
  const mongooseClient = app.get("mongooseClient");
  const schema = new mongooseClient.Schema(
    {
      _user: { type: String, ref: "users" },
      name: {
        type: String,
      },
      short_description: {
        type: String,
      },
      business_image: {
        id: {
          type: String,
          unique: true,
        },
        url: {
          type: String,
          unique: true,
        },
      },
      location: {
        lat: {
          type: Number,
        },

        long: {
          type: Number,
        },
      },
      formatted_address: {
        type: String,
      },
      rating: {
        type: Number,
      },
      category: {
        type: String,
        // lowercase: true,
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
