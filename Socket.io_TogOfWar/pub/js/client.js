var socket = io();

var vm = {
    data() {
        return {
            ID: 0,
            dogOffset: 0,
            win: false
        };
    },
    methods: {
        tugLeft() {
            //this.dogOffset -= 20;
            socket.emit("tugLeft", this.dogOffset);
        },
        tugRight() {
            //this.dogOffset += 20;
            socket.emit("tugRight", this.dogOffset);
        }
    },
    computed: {
        currentDogOffset() {
            return {
                left: this.dogOffset + "px"
            };
        },
        // a copmputed method here that checks to see if dogOffset is a certain number
        // if dogOffset is that amount, that player wins
        // sends that to the other clients
        // depending on what message that client get's the DOM and CSS will change

        // BUT i'm not sure how to tell which client is going right and left
    },
    mounted() {
        // the if() statement is just me testing out the "winning" aspect of this game
        socket.on("tugLeft", dataFromServer => {
            this.dogOffset = dataFromServer;
        }),
        socket.on("tugRight", dataFromServer => {
            this.dogOffset = dataFromServer;
        })
        
    }
};

var app = Vue.createApp(vm).mount("#main");
 
socket.on("updateOffset", function(dataFromServer) {
    app.dogOffset = dataFromServer;
});

var users = 1;
socket.on("getID", function(dataFromServer) {
    app.ID = dataFromServer;
    console.log("User " + (users++) + " ID: " + app.ID);
});