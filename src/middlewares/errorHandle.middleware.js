export const errorHandleMiddleware = (err, req, res, next) => {
  console.log(err);
  err.message = err.message || "Internal Server Error !!";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
