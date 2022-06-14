// STEP 7 - Implement Role Verification. The General Steps are:
//  Check to see if the req.user property exists
//  if exists: compare the req.user.role to "admin"
//  if admin: Pass the request to the next handler using next();
//             
//  if not: return status 401 "Unauthorized Access"
//  if not: return status 401 "User is not authenticated"

module.exports = (req, res, next) => {
  // Your code here
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