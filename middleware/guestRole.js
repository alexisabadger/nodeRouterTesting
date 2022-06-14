
module.exports = (req, res, next) => {
  // Your code here
  if (req.params) {
    // Check to see if the role is admin
    console.log( JSON.stringify(req.query));
    console.log(req.query.email);
    console.log(req.query.role);

    if (req.query.role == "trial" || req.query.role == "guest") {
      next(); // pass the request to our main handler
    } else {
      res.status(400).send("Assigned role missing");
    }
  } else {
    res.status(401).send("User is not authenticated");
  }

};