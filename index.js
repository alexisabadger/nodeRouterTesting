const express = require("express");
const database = require("./database.js");
const cors = require('cors');


const usersRoutes = require("./routes/user.js");
const wikiRoutes = require("./routes/wiki.js");
const genWebToken = require("./generateToken.js");
const routes = require('./routes/user')
var session = require('express-session');
var bodyParser = require('body-parser');// get body-parser

const app = express();

app.use(express.static("./public"));
app.use(express.json({limit: '5mb'}));


app.use("/api", usersRoutes);

app.use('/', routes);

// * testing only

var test1 = require("./routes/test1");
app.use("/test1", test1);

var test2 = require("./routes/test2.js");
app.use("/test2", test2);



// * 
var key = genWebToken.genToken(22);
//console.log('my Key is ' + key);



app.listen(3000);