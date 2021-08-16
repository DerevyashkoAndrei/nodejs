require("dotenv").config();

/*
.env file
    PORT=number
    JWT_SECRET=string
*/

const { PORT, JWT_SECRET } = process.env;


exports.PORT = PORT;
exports.JWT_SECRET = JWT_SECRET;