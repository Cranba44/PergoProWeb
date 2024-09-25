const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.status(400).send("Access Denied");

    const payload = jwt.verify(token, process.env.TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    try {
      const token = req.header("auth-token");
      if (!token) return res.status(400).send("Access Denied");

      const payload = jwt.verify(token, process.env.TOKENREFRESCO);
      req.payload = payload;
      next();
    } catch (error) {
      res.status(400).send("Expired Token");
    }
  }
};

module.exports = verifyToken;