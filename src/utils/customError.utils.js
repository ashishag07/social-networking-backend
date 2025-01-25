export class CustomError extends Error {
  constructor(statusCode, error) {
    super(error);
    this.statusCode = statusCode;
  }
}
