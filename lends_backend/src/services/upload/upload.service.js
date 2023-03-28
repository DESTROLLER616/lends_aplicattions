// Initializes the `upload` service on path `/upload`
require('dotenv').config();
const { Upload } = require('./upload.class');
const hooks = require('./upload.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };

  // Initialize our service with any options it requires
  app.use('/upload', new Upload(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
};


// const { Upload } = require('./upload.class');
// const hooks = require('./upload.hooks');
// const multer = require('multer');
// const multipartMiddleware = multer();

// module.exports = function (app) {
//   const options = {
//     paginate: app.get('paginate'),
//     fileServer: app.get('fileServer'),
//     filePath: app.get('filePath'),
//     imageMaxWidth: app.get('imageMaxWidth'), // for image upload only
//     imageMinWidth: app.get('imageMinWidth'),
//   };



//   // Initialize our service with any options it requires
//   app.use('/upload', new Upload(options,
//     multipartMiddleware.array('files'),
//     // another middleware, this time to
//     // transfer the received files to feathers
//     function (req, res, next) {
//       req.feathers.files = req.files;
//       next();
//     },
//     app));

//   // Get our initialized service so that we can register hooks
//   const service = app.service('upload');

//   service.hooks(hooks);
// };
