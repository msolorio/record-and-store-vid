var express = require('express');
var app = express();
const PORT = 8000;

app.use('/', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('public/index.html' , { root : __dirname});
});

app.listen(PORT, function() {
  console.log(`Your app is running on port ${PORT}... You better go and catch it`);
});