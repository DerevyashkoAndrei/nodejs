require("dotenv").config();

/*
.env file
    PORT=number
    JWT_SECRET=string
*/

const { PORT, JWT_SECRET } = process.env;

exports.UPLOADS_ROOT = __dirname;
exports.UPLOADS_FOLDER = "/uploads";
exports.PIZZA_IMAGES = "/pizzas/";
exports.PORT = PORT;
exports.JWT_SECRET = JWT_SECRET;
