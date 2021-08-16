const RequestService = require("../services/RequestService");

const logRequest = (req, res, next) => {
  RequestService.add({
    router: req.baseUrl.slice(1),
    url: req.baseUrl + req.url,
    timestamp: Date.now(),
    user: res.locals.user || null
  });
  next();
};

module.exports = {
  logRequest,
};
