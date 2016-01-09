/** Require SetUp **/
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

/** SetUp Middleware **/
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

/** Register API Routes **/
app.get('/AllPlayers', function (req, res) {
  fs.readFile(__dirname + '/data.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err.message);
      res.status = 500;
      var errorResponse = { success: false, errors : err };
      res.end(errorResponse);
    } else {
      res.status = 200;
      res.end(data);
    }
  })
});

app.get('/Favorites', function(req, res){
  fs.readFile(__dirname + '/data.json', 'utf8', function (err, data) {
    if (err) {
      res.status = 500;
      var errorResponse = { success: false, errors : err };
      res.end(errorResponse);
    } else {
      var dataObject = JSON.parse(data.toString());
      var arr = [];
      for(var i = 0; i < dataObject.length; i++){
        if(dataObject[i].isFavorite) {
          arr.push(dataObject[i]);
        }
      }
      res.status = 200;
      res.end(JSON.stringify(arr));
    }
  })
});

//save player in data or somewhere else

app.put('Player', function(req,res){
  console.log(req.url);
});

//

app.listen(3000);