const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//require bcrypt
//require jsonwebtoken
// require ../middleware/authUser.js
// require ../middleware/adminRole.js

const authUser = require("../middleware/authUser.js");
const adminRole = require("../middleware/adminRole.js");
const guestRole = require("../middleware/guestRole.js");


const router = new express.Router();

router.get('/testget', (req, res) => {
 res.json({msg: "Users Get Routes works"});
});

router.post("/testpost", (req, res) => {
res.status(202).send("User Post Routes works.");
});

router.post("/register", (req, res) => {
// Your code here
  // Checking to see if an account with the registration email already exists or not
  User.findOne({ email: req.body.email }, (err, result) => {
    if (!err) {
      if (!result) { // if result is undefined the user does not exist

        // Hash the user password and store it
        console.log(req.body.email);
        let newUser = new User(req.body);

        // This will manually validate the object against the schema
        let valErr = newUser.validateSync();

        if (!valErr) { // The object is valid
           
           console.log('This user is valid');
          // Hash the user's password
          newUser.password = bcrypt.hashSync(req.body.password, 10);

          // Save the user account
          newUser.save((err, result) => {
            if (!err) {
              res.status(201).send(result);
            } else {
              res.status(400).send(err.message);
            }
          })
        }
      } else {
        res.status(400).send("User already exists.");
      }
    } else {
      res.status(400).send(err.message);
    }
  });

/* **** End   **** */
});


router.post("/signin", (req, res) => {
// Your code here
  // Looking for the user in the collection
  User.findOne({ email: req.body.email }, (err, result) => {
    if (!err) {
      if (result) { // if result is defined, the user exists

        // step 1 is compare the user's password to make sure it's valid

        bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
          if (bcresult) { // if the password was valid

            // Step 2: create the JWT object, sign it and send it to the user

            // Create the object that will be sent to the client as the token
            let payLoad = {
              _id: result._id,
              name: result.name,
              email: result.email,
              role: result.role
            };

            // Create the token (sign)

            let token = jwt.sign(payLoad, "12345678");

            // We now send the token to the client
            res.status(200).send({
              _id: result._id,
              name: result.name,
              email: result.email,
              role: result.role,
              jwt: token
            });

          } else {
            res.status(400).send("Invalid email/password");
          }
        })

      } else { 
        res.status(400).send("Invalid email/password");
      }
    } else {
      res.status(400).send(err.message);
    }
  })
});


//STEP 6 - Apply the authUser middleware it to this endpoint. Test using Reqbin

router.get("/secure", authUser, (req, res) => {

  res.status(200).send("Successfully Accessed Secure Endpoint!");
});

//STEP 8 - Apply the authUser AND adminRole middleware it to this endpoint. Test using Reqbin
router.get("/secureadmin", adminRole, (req, res) => {

  res.status(200).send("Successfully Accessed Secure Admin Endpoint!");
});

/**
 * 
 * Non Secure Login user
 */
router.post('/trial', guestRole, function (req, res) {
    console.log(req.body);//res.sendStatus(200);
     res.status(212).send("Trial User Non Secure Endpoint!");
});

// Unsecure endpoints
router.post('/guest', adminRole, function (req, res) {
    console.log(req.body);//res.sendStatus(200);
  res.status(213).send("Guest Login Non Secure Endpoint!");
});


module.exports = router;