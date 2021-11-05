var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("pub"));
app.use(bodyParser.urlencoded({extended: true}));

var gridReady = false;
var numberOfTeams = undefined;
var grid = [];
var status = [{stat: "Win", color: "lightgreen"}, {stat: "Loss", color: "lightcoral"}, {stat: "Draw", color: "aqua"}, {stat: "-", color: "gray"}];
var statusIndex = 0;

// lets the clients know if there is a bracket/grid made already (mostly for hiding the team size stuff in the html)
app.post("/isgridReady", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(gridReady));
    res.end();
});

// gets the number of teams given by the user and builds a bracket off of that
// sends this to new clients as well
app.post("/getTeams", function(req, res) {
    if(numberOfTeams !== undefined) { 
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(numberOfTeams));
        res.end();
    }
});

// when a new client joins it sets the bracket to whatever the bracket currently is (if there is one)
app.post("/updateGrid", function(req, res) {
    var newGrid = [];
    for(let i = 0; i < numberOfTeams; i++) {
        newGrid[i] = new Array(numberOfTeams);
        for(let k = 0; k < numberOfTeams; k++) {
            newGrid[i][k] = grid[i][k];
        }
    }
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(newGrid));
    res.end();
});

// creating the grid for the round-robin tournemant
app.post("/submitNumberOfTeams", function(req, res) {
    numberOfTeams = req.body.teams;
    for(let i = 0; i < numberOfTeams; i++) {
        grid[i] = new Array(numberOfTeams);
        for(let k = 0; k < numberOfTeams; k++) {
            grid[i][k] = {
                gameStatus: "-",
                styles: "gray" // set to gray so the bracket is shown correctly when first loaded (no other game stats are listed)
            }
        }
    }
    gridReady = true; // gridReady lets the other clients know if a bracket is applied or not
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(grid));
    res.end();
});

// this is used to change the game status in each cell (either win, loss, draw, or '-' if there hasn't been a game played yet or there won't be a game)
app.post("/changeGameStatus", function(req, res) {
    if(req.body.ind1 != req.body.ind2) {
        grid[req.body.ind1][req.body.ind2].gameStatus = status[statusIndex].stat;
        grid[req.body.ind1][req.body.ind2].styles = status[statusIndex].color;
        statusIndex = (statusIndex + 1) % status.length; // this replaces my if() statement that changed statusIndex to 0, cleaner this way!
    }
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(grid));
    res.end();
});

// used to clear the current bracket/grid (updates all other clients as well), you can then create a new one after
app.post("/clearBracket", function(req, res) {
    grid.length = 0;
    gridReady = false;
    numberOfTeams = undefined;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(grid));
    res.end();
});

app.listen(80, function() {
    console.log("Your server is waiting on port localhost:80 or 127.0.0.1");
});