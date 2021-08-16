const Koa = require("koa");
const app = new Koa();
const logger = require("koa-logger");
const koaBody = require("koa-body");
const pizzaRouter = require("./routes/pizza");

app.use(logger());
app.use(koaBody({ multipart: true, json: true }));

app.use(pizzaRouter.routes());

app.listen(3000);
