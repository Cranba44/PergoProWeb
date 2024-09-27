const jwt = require("jsonwebtoken");

const generateToken = (payload, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign(payload, process.env.TOKENREFRESCO, {
      expiresIn: "600min",
    });
  }

  return jwt.sign(payload, process.env.TOKEN, {
    expiresIn: "150min",
  });
};

module.exports = { generateToken };