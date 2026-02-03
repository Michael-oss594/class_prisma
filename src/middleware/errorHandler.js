function errorHandler(err, _req, res, _next) {
  console.error(err);
  if (err.code === 'P2002') {
    return res.status(409).json({
        message:'Conflict error: Duplicate entry detected.',
    });
  }
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;