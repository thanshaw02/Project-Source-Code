var express = require("express");
var app = express();

var http = require("http");

//We are getting an instance of a Node HTTP (web) server here.
//We are also telling it to connect up with our Express application,
//so it can handle requests.
var server = http.Server(app);

//On command prompt, we need to do "npm install socket.io"
var socketio = require("socket.io");

//instantiates our 'io' instance, and also connects it up with the HTTP
//server we already created.
var io = socketio(server);

var currentOffset;
var userID = [];
var index = 0;

io.on("connection", function(socket) {
    console.log("Somebody connected.");
    
    // THIS ASSUMES ONLY TWO PEOPLE ARE PLAYING AT A TIME
    // this creates a special ID for each client that connects, then send that ID over to the client
    // if this user ID is less than the other, then that client needs to go to the right
    // if this user ID is greater than the other, then that client needs to go to the left
    userID[index] = Math.round(Math.random() * 1000);
    socket.emit("getID", userID[index]);
    ++index;

    // when someone new connects, dogOffset is automatically set to the current dogOffset
    socket.emit("updateOffset", currentOffset);

    socket.on("disconnect", function() {
        console.log("Somebody disconnected.");
    });

    // moves the tug-of-war dogs to the left
    socket.on("tugLeft", function(dataFromClient) {
        currentOffset = dataFromClient - 20;
        console.log(currentOffset); // debugging
        io.emit("tugLeft", currentOffset);
    });

    // moves the tug-of-war dogs to the left
    socket.on("tugRight", function(dataFromClient) {
        currentOffset = dataFromClient + 20;
        console.log(currentOffset); // debugging
        io.emit("tugRight", currentOffset);
    });
});

//Just for static files (like usual).  Eg. index.html, client.js, etc.
app.use(express.static("pub"));

server.listen(8080, function() {
    console.log("Server is listening on port 8080");
});