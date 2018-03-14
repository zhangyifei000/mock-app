var Express = require('express');
var bodyParser = require('body-parser');

const app = new Express();

app.get('/', function(req, res) {
  res.send('hello word');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});