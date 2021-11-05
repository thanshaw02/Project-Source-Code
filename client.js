var vm = {
    data() {
        return {
          listItems: [],
          itemText: ""
        };
    },
    methods: {
      newListItem() {
        $.post("/pushItem", {item: this.itemText}, dataFromServer => {
          this.listItems = dataFromServer;
          this.itemText = "";
        });
      },
      moveItemDown(index) {
        // moves listItem down one index (swapping the list items in question)
        $.post("/moveItemDown", {ind: index}, dataFromServer => {
          console.log("Down: " + this.listItems); // debugging
          this.listItems = dataFromServer;
          console.log("Down: " + this.listItems); // debugging
          console.log("Down: " + index); // debugging
        });
      },
      moveItemUp(index) {
        // moves listItem up one index (swapping the list items in questions)
        $.post("/moveItemUp", {ind: index}, dataFromServer => {
          console.log("Up: " + this.listItems); // debugging
          this.listItems = dataFromServer;
          console.log("Up: " + this.listItems); // debugging
          console.log("Up: " + index); // debugging
        });
      }
    }
};

var app = Vue.createApp(vm).mount("#main");
