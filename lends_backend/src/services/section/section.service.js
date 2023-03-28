// Initializes the `section` service on path `/section`
const { Section } = require("./section.class");
const createModel = require("../../models/section.model");
const hooks = require("./section.hooks");
const upload = require("../../utils/multer");
const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");
const { response, request } = require("@feathersjs/express");

const uploadMiddleware = async (req = request, res = response, next) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "Section");

    if (req.method === "POST") {
      const { path } = req.file;
      const { url } = await uploader(path);
      fs.unlinkSync(path);
      req.body = { ...req.body, url };
      next();
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "bad request ",
    });
  }
};

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create", "patch"],
  };

  // Initialize our service with any options it requires
  app.use(
    "/section",
    [upload.single("image"), uploadMiddleware],
    new Section(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("section");

  service.hooks(hooks);
};
