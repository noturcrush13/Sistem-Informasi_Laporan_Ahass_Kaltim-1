const dotenv = require("dotenv");
dotenv.config();

const key = process.env.SECRET_KEY;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const error = new Error();
  error.status = 403;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, key);
        req.user = user;
        return next();
      } catch (error) {
        error.message = "invalid token";
        return next(error);
      }
    }

    error.message = "authorization token must be Bearer";
    return next(error);
  }

  error.message = "authorization header must be provided";
  return next(error);
};