import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (id) => {
  const jwt_secret = config.get("JWT_SECRET");
  return jwt.sign({ id }, jwt_secret, {
    expiresIn: "10d",
  });
};

export default generateToken;
