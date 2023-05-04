import { ErrorRequestHandler } from 'express';

export default class ErrorHandler {
  public static errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ error: err.message });
  };
}
