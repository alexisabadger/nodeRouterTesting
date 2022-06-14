var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on things Test2.');
});

router.get('/test2', function(req, res){
   res.send('GET route on things Test2.');
});

router.post('/test2', function(req, res){
   res.send('POST route on things Test2.');
});

//export this router to use in our index.js
module.exports = router;
