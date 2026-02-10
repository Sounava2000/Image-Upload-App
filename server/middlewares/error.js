export class ErrorHandeler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.name === "CastError") {
    err = new ErrorHandeler(400, "Invalid resource ID");
  }

  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandeler(
      401,
      "Invalid authentication token. Please login again."
    );
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandeler(
      401,
      "Authentication token expired. Please login again."
    );
  }
  return res.status(err.statusCode).json({
    message: err.message,
    success: false,
  });
};
