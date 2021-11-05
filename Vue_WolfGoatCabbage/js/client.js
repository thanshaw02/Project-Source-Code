var vm = {
    data() {
      return { 
        // xxCrossed: false = on the left, true = on the right
        // xxIsLeft and xxIsRight refers to which side of the screen any given object is on
        // I probably could use xxIsRight and xxIsLeft instead of xxCrossed, but I haven't gotten around to it yet
        // All console logs are for debugging
        wolfCrossed: false,
        wolfIsBoardedLeft: false,
        wolfIsBoardedRight: false,
        wolfIsLeft: true,
        wolfIsRight: false,
        goatCrossed: false,
        goatIsBoardedLeft: false,
        goatIsBoardedRight: false,
        goatIsLeft: true,
        goatIsRight: false,
        cabbageCrossed: false,
        cabbageIsBoardedLeft: false,
        cabbageIsBoardedRight: false,
        cabbageIsLeft: true,
        cabbageIsRight: false,
        boatCrossed: false,
        boatIsLeft: true,
        boatIsRight: false
      }
    },
    // Two parts to each method, the first is for the left side of the stream and the second is for the right
    methods: {
      boardCabbage(event) {
        if(this.cabbageIsBoardedLeft == false && this.cabbageCrossed == false && this.boatIsLeft == true) this.cabbageIsBoardedLeft = true;
        else if(this.cabbageIsBoardedLeft == true && this.cabbageCrossed == false && this.boatIsLeft == true) this.cabbageIsBoardedLeft = false;
        
        if(this.cabbageIsBoardedRight == false && this.cabbageCrossed == true && this.boatIsRight == true) this.cabbageIsBoardedRight = true;
        else if(this.cabbageIsBoardedRight == true && this.cabbageCrossed == true && this.boatIsRight == true) this.cabbageIsBoardedRight = false;
        console.log("Cabbage boarded left: " + this.cabbageIsBoardedLeft);
        console.log("Cabbage boarded right: " + this.cabbageIsBoardedRight);
        console.log("**********");
      },
      boardGoat(event) {
        if(this.goatIsBoardedLeft == false && this.goatCrossed == false && this.boatIsLeft == true) this.goatIsBoardedLeft = true;
        else if(this.goatIsBoardedLeft == true && this.goatCrossed == false && this.boatIsLeft == true) this.goatIsBoardedLeft = false;
        
        if(this.goatIsBoardedRight == false && this.goatCrossed == true && this.boatIsRight == true) this.goatIsBoardedRight = true;
        else if(this.goatIsBoardedRight == true && this.goatCrossed == true && this.boatIsRight == true) this.goatIsBoardedRight = false;
        console.log("Goat boarded left: " + this.goatIsBoardedLeft);
        console.log("Goat boarded right: " + this.goatIsBoardedRight);
        console.log("**********");
      },
      boardWolf(event) {
        if(this.wolfIsBoardedLeft == false && this.wolfCrossed == false && this.boatIsLeft == true) this.wolfIsBoardedLeft = true;
        else if(this.wolfIsBoardedLeft == true && this.wolfCrossed == false && this.boatIsLeft == true) this.wolfIsBoardedLeft = false;
        
        if(this.wolfIsBoardedRight == false && this.wolfCrossed == true && this.boatIsRight == true) this.wolfIsBoardedRight = true;
        else if(this.wolfIsBoardedRight == true && this.wolfCrossed == true && this.boatIsRight == true) this.wolfIsBoardedRight = false;
        console.log("Wolf boarded left: " + this.wolfIsBoardedLeft);
        console.log("Wolf boarded right: " + this.wolfIsBoardedRight);
        console.log("**********");
      },
      moveBoat(event) {
        // Moving the boat from left to right and vice versa, using two images for the boat in my HTML
        if(this.boatIsLeft == true) {
          this.boatCrossed = true;
          this.boatIsLeft = false;
          this.boatIsRight = true
        }
        else if(this.boatIsLeft == false) {
          this.boatCrossed = false;
          this.boatIsLeft = true;
          this.boatIsRight = false;
        }
        
        // Code for left side of river!
        // first it will check which side of the river the object is it (if it has crossed or not)
        // then this will check if the animal or cabbage has been "boarded" on the boat
        // then it will move the animal or cabbage to the other side of river when moving the boat
        if(this.wolfIsBoardedLeft == true && this.goatIsBoardedLeft == false && this.cabbageIsBoardedLeft == false && this.boatCrossed == true) {
          this.wolfCrossed = true;
          this.wolfIsBoardedLeft = false;
          this.wolfIsLeft = false;
          this.wolfIsRight = true;
          console.log("Wolf crossed: " + this.wolfCrossed);
          console.log("**********");
        }
        if(this.goatIsBoardedLeft == true && this.wolfIsBoardedLeft == false && this.cabbageIsBoardedLeft == false && this.boatCrossed == true) {
          this.goatCrossed = true;
          this.goatIsBoardedLeft = false;
          this.goatIsLeft = false;
          this.goatIsRight = true;
          console.log("Goat crossed: " + this.goatCrossed);
          console.log("**********");
        }
        if(this.cabbageIsBoardedLeft == true && this.wolfIsBoardedLeft == false && this.goatIsBoardedLeft == false && this.boatCrossed == true) {
          this.cabbageCrossed = true;
          this.cabbageIsBoardedLeft = false;
          this.cabbageIsLeft = false;
          this.cabbageIsRight = true;
          console.log("Cabbage crossed: " + this.cabbageCrossed);
          console.log("**********");
        }
        
        // Code for right side of river!
        if(this.wolfIsBoardedRight == true && this.goatIsBoardedRight == false && this.cabbageIsBoardedRight == false && this.boatCrossed == false) {
          this.wolfCrossed = false;
          this.wolfIsBoardedRight = false;
          this.wolfIsLeft = true;
          this.wolfIsRight = false;
          console.log("Wolf crossed: " + this.wolfCrossed);
          console.log("**********");
        }
        if(this.goatIsBoardedRight == true && this.wolfIsBoardedRight == false && this.cabbageIsBoardedRight == false && this.boatCrossed == false) {
          this.goatCrossed = false;
          this.goatIsBoardedRight = false;
          this.goatIsLeft = true;
          this.goatIsRight = false;
          console.log("Goat crossed: " + this.goatCrossed);
          console.log("**********");
        }
        if(this.cabbageIsBoardedRight == true && this.wolfIsBoardedRight == false && this.goatIsBoardedRight == false && this.boatCrossed == false) {
          this.cabbageCrossed = false;
          this.cabbageIsBoardedRight = false;
          this.cabbageIsLeft = true;
          this.cabbageIsRight = false;
          console.log("Cabbage crossed: " + this.cabbageCrossed);
          console.log("**********");
        }
        console.log("Boat crossed: " + this.boatCrossed);
        console.log("**********");
      },
      resetGame(event) {
        this.wolfCrossed = false;
        this.wolfIsBoardedLeft = false;
        this.wolfIsBoardedRight = false;
        this.wolfIsLeft = true;
        this.wolfIsRight = false;
        this.goatCrossed = false;
        this.goatIsBoardedLeft = false;
        this.goatIsBoardedRight = false;
        this.goatIsLeft = true;
        this.goatIsRight = false;
        this.cabbageCrossed = false;
        this.cabbageIsBoardedLeft = false;
        this.cabbageIsBoardedRight = false;
        this.cabbageIsLeft = true;
        this.cabbageIsRight = false;
        this.boatCrossed = false;
        this.boatIsLeft = true;
        this.boatIsRight = false;
        console.log("All in game attributes have been reset.")
        console.log("**********");
      }
    },
    computed: {
      gameMessage() {
        if(this.cabbageCrossed == true && this.wolfCrossed == true && this.goatCrossed == true) return "You have won! Click reset to play again.";
        if((this.boatCrossed !== this.cabbageCrossed && this.boatCrossed !== this.goatCrossed) || (this.boatCrossed !== this.goatCrossed && this.boatCrossed !== this.wolfCrossed)) return "You have lost, click reset to try again.";
        return "See if you can get them all safely across the river.";
      },
    }
  }
  
  var app = Vue.createApp(vm).mount("#main");