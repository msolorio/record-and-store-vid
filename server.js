var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('public/index.html' , { root : __dirname});
});

app.listen(3000, function() {
  console.log('Your app is running on port 3000... You better go and catch it');
});