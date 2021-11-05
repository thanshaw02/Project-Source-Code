var vm = {
    data() {
        return {
            numberOfTeams: undefined,
            gridReady: false,
            grid: [],
        };
    },
    methods: {
        submitTeams() {
            $.post("/submitNumberOfTeams", {teams: this.numberOfTeams}, dataFromServer => {
                this.grid = dataFromServer;
                this.gridReady = true;
            });
        },
        changeGameStatus(index1, index2) {
            $.post("/changeGameStatus", {ind1: index1, ind2: index2}, dataFromServer => {
                this.grid = dataFromServer;
            });
        },
        clearBracket() {
            $.post("/clearBracket", {}, dataFromServer => {
                this.grid = dataFromServer;
            });
            this.gridReady = false;
            this.numberOfTeams = undefined;
        }
    },
    mounted() {
        $.post("/isgridReady", {}, dataFromServer => {
            this.gridReady = dataFromServer;
        });
        $.post("/getTeams", {}, dataFromServer => {
            this.numberOfTeams = dataFromServer;
        });
        $.post("/updateGrid", {}, dataFromServer => {
            this.grid = dataFromServer;
        });
    }
}

var app = Vue.createApp(vm).mount("#main");