module.exports = (req, res, next) => {

  if (req.params) {
    // Check to see if the role is admin
    console.log( JSON.stringify(req.query));
    console.log(req.query.email);
    console.log(req.query.role);

    if (req.query.role == "admin") {
      next(); // pass the request to our main handler
    } else {
      res.status(401).send("Admin - Unauthorized access");
    }
  } else {
    res.status(401).send("Admin - User is not authenticated");
  }

};
