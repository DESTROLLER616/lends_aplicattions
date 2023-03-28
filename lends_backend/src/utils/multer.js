const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/imageUploads"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //reject file
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3840 * 3840,
  },
  fileFilter: fileFilter,
});
module.exports = upload;
