import winston from "winston";

const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [new winston.transports.File({ filename: "request-log" })],
});

const loggerMiddleware = (req, res, next) => {
  // exclude user routes
  if (
    !req.url.startsWith("/api/signin") ||
    !req.url.startsWith("/api/signup")
  ) {
    winstonLogger.log({
      level: "info",
      message: `${new Date().toString()} incoming request`,
      reqUrl: `${req.url}`,
      reqBody: `${JSON.stringify(req.body)}`,
    });
  }
  next();
};

export default loggerMiddleware;
