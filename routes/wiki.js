const express = require("express");
const Page = require("../models/wiki.js");
const router = express.Router();


// Url Endpoint handlers

// This handler should do two things, update the hit counter and return the results
router.get("/:pageUrl", (req, res) => {
  
  // find the page based on the pageUrl
  // if the page is found, update the hits
  res.send('get /:PageUrl route on things wiki.js.');
  result.hits++;

  result.save(function(err, result) {
    if (result) {
      res.status(200).send(result);
    }
  })

})

router.put("/:pageUrl", (req, res) => {

  // find the page based on pageURL
  // if the page exists (result)
  res.send('put pageUrl route on things wiki.js.');
  //compare the passed in management password with the stored one
  if (result.password == req.body.password) {
    result.title = req.body.title;
    result.category = req.body.category;
    result.html = req.body.html;

    // save
    result.save(function(err, result) {
      res.status(200).send(result);
    })
  }

});
// 1) Search Endpoint

router.get("/search/:term", (req, res) => {
  res.send('get search:term route on things wiki.js.');
  var filter = {
    $or: [
      { title: { $regex: req.params.term, $options: "i" } },
      { html: { $regex: req.params.term, $options: "i" } }
    ]
  }
/*
  Wiki.find(filter).exec() { 
    res.status(200).send(result);
  }
*/      
})

// 2 Return single wiki page GET /api/wiki/:urlName

router.get("/:urlName", (req, res) => {
  // 1) query collection to a document with the urlName (if it exists)
  // 2) increment the page counter and return the document
  res.send('get :/urlName route on things wiki.js.');
  Wiki.findOne({ urlName: req.params.urlName }, (err, result) => {
    if (result) { // check to make sure the wiki page exists
      result.pageViews++;
      result.save((err, result) => {
        // return the status and the result
      })
    }
  })
})

// 3 Create new wiki page POST /api/wiki/

router.post("/", (req, res) => {
  // 1) create the new wiki object new Wiki(req.body)
  // 2) You save the wiki .save() and return the result
})

// 4 Update an existing wiki page PUT /api/wiki/:urlName

router.put("/:urlName", (req, res) => {
  // We can't use the findByIdAndUpdate() because we need to compare the management password BEFORE we update

  // 1) get the document using .findOne()
  // 2) if document is found, compare the stored management password with the one passed into the request
  //    if (result.mPassword == req.body.mPassword) if true
  // 3) set the fields one by one and call the save .save() -> return result
  res.send('put /:urlName route on things wiki.js.');
})

// 5 Delete a wiki page DELETE /api/wiki/:urlName
router.delete("/:urlName", (req, res) => {
  // 1) get the document using .findOne()
  // 2) if document is found, compare the stored management password with the one passed into the request
  //    if (result.mPassword == req.body.mPassword) if true
  // 3) findByIdAndDelete(result._id) OR
  //    findOneAndDelete({ urlName: req.params.urlName })
  res.send('delete :/urlName route on things wiki.js.');
})


module.exports = router