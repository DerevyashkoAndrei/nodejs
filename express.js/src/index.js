const { json } = require("body-parser");
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { PORT } = require("./config");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const pizzaRoute = require("./routes/pizzas");
const requestRoute = require("./routes/request");
const app = express();

app.use(json());

app.get("/", (_, res) => {
  res.send("Hello i am not dead ;)");
});

app.use("/orders", orderRoute);
app.use("/pizzas", pizzaRoute);
app.use("/requests", requestRoute);
app.use("/auth", authRoute);

app.use((err, _, res, __) => {
  if (err.name === "UnauthorizedError") {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
  if (err)
    res
      .status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
      .write(err.message);
  res.send();
});

const server = app.listen(PORT, "localhost", function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
