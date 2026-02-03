/**
 * Middleware to standardize API responses
 * Adds res.success method for consistent success responses
 */
const responseHandler = (req, res, next) => {
  res.success = (data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  };
  next();
};

module.exports = { responseHandler };