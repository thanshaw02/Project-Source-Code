var express = require("express"); //server-side web framework
var bodyParser = require("body-parser"); //for parsing POST requests

var app = express();
app.use(express.static('pub')); //to serve up .txt, .html, .jpg, etc. files.
app.use(bodyParser.urlencoded({extended: true})); //So we can parse out POST requests from the client.

var myItems = [];

app.post("/pushItem", function(req, res) {
  myItems.push(req.body.item);

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(myItems));
  res.end();
});

app.post("/moveItemUp", function(req, res) {
  var temp = myItems[req.body.ind];
  myItems[req.body.ind] = myItems[parseFloat(req.body.ind) - 1];
  myItems[parseFloat(req.body.ind) - 1] = temp;

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(myItems));
  res.end();
});

app.post("/moveItemDown", function(req, res) {
  var temp = myItems[req.body.ind];
  myItems[req.body.ind] = myItems[parseFloat(req.body.ind) + 1];
  myItems[parseFloat(req.body.ind) + 1] = temp;

  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(myItems));
  res.end();
});

// Using port 8080 here:
app.listen(8080, function() {
    //This function is only executed once the server is ready.
    console.log("Server is waiting on port 8080");
});
