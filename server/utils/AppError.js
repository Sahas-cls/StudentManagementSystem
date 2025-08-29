class AppError extends Error {
  constructor(message, statusCode, path = null) {
    super(message)
    this.statusCode = statusCode || 500;
    this.path = path;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
    // console.log("from appError.js ===== : ", path)
  }
}

module.exports = AppError;