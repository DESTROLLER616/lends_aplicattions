// products-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'products';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    _business: {
      type: String
    },
    name: {
      type: String
    },
    short_description: {
      type: String,
    },
    rental_price: {
      type: Number
    },
    product_image: {
      id: {
        type: String,
        unique: true
      },
      url: {
        type: String,
        unique: true
      },
    },
    quantity: {
      type: Number
    }

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
