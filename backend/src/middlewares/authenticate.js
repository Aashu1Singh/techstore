const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  try {
    const decodedToken = await jwt.verify(token, "secret");
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json("Unauthorised access");
  }

 
};

module.exports = authenticate;
