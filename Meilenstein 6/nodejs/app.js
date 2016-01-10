/** Require SetUp **/
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

/** SetUp Middleware **/
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
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
      res.end(err.message);
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
      res.end(err.message);
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

app.put('/Player', function(req,res){
  var obj = req.body;
  var url = __dirname + '/form.txt';
  fs.appendFile(url, entry(obj),function(err){
    if(err){
      return console.error(err);
    }else{
      console.log('Data written/append!');
    }
  })
  res.status = 200;
  res.send('fine');
});

function entry(obj){
  return (obj.vorname + ' ' + obj.name + ' ' +  obj.jahr+ ' ' +
  obj.hcoach + ' ' + obj.acoach + ' ' + obj.position + ' ' + obj.number + '\n'
  );
}
//

app.listen(3000);