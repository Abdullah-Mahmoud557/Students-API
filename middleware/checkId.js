const httpStatusText = require ('../utils/httpStatusText')
module.exports = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).json({ status : httpStatusText.FAIL, data: "Invalid ID format" });
  }
  next(err);
};