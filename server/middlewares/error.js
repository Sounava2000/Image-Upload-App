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

  
  return res.status(err.statusCode).json({
    message: err.message,
    success: false,
  });
};
