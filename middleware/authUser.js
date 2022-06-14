const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
// Your code here
    const token = req.header("x-authtoken");
    if (token) {    
      try {
        req.jwtPayLoad = jwt.verify(token, "12345678");
        next(); // this will pass the request to the next handler
      } catch(ex) {
        res.status(400).send("User - Access denied. Invalid token");
      }
    } else {
      res.status(401).send("User -Access denied. No token provided");
    }
};
