const multer = require("multer");
const path = require("path");
const { UPLOADS_ROOT, UPLOADS_FOLDER, PIZZA_IMAGES } = require("../config");

const pizzaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_ROOT + UPLOADS_FOLDER + PIZZA_IMAGES);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

exports.pizzasUploads = multer({ storage: pizzaStorage });
// exports.pizzasUploads = multer({ dest: __dirname + "/../uploads/pizzas/" });
