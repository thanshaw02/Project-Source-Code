var vm = {
    data() {
        return {
            admin: false,
            registering: false, 
            hasLoggedIn: false,
            registerName: "",
            registerEmail: "",
            registerPassword: "",
            loginEmail: "",
            loginPassword: "",
            dateOfApp: "",
            timeOfApp: "",
            appDetails: "",
            serverMessage: "",
            appointmentStatus: "",
            registeringError: "",
            appointments: [],
        }
    },
    methods: {
        register() {
            $.post('/register', { firstName: this.registerName, email: this.registerEmail, password: this.registerPassword}, dataFromServer => {
                if(dataFromServer == true) this.registering = false
                else this.registering = true
                this.registerName = ""
                this.registerEmail = ""
                this.registerPassword = ""
                this.loginError = ""
            })
        },
        login() {
            // admin loggin is hard coded in, didn't have time to work with passport to make loggin "roles"
            if(this.loginEmail === 'admin@admin.net' && this.loginPassword === 'admin') {
                $.post('/loginAsAdmin', dataFromServer => {
                    this.appointments = dataFromServer
                })
                this.loginEmail = ""
                this.loginPassword = ""
                this.admin = true
                this.hasLoggedIn = undefined
            }
            else {
                $.post('/login', { email: this.loginEmail, password: this.loginPassword }, dataFromServer => {
                    if(dataFromServer !== 'empty') {
                        this.hasLoggedIn = true
                        this.loginEmail = ""
                        this.loginPassword = ""
                        this.appointmentStatus = dataFromServer
                    }
                    else {
                        this.hasLoggedIn = true
                        this.loginEmail = ""
                        this.loginPassword = ""
                        this.appointmentStatus = ""                    
                    }
                })
            }
        },
        logout() {
            this.serverMessage = "";
            this.loginError = ""
            this.hasLoggedIn = false;
            this.appointmentStatus = "";
        },
        adminLogout() {
            this.admin = false
            this.hasLoggedIn = false
        },
        submitApp() {
            $.post('/submitApp', {date: this.dateOfApp, time: this.timeOfApp, info: this.appDetails}, dataFromServer => {
                this.serverMessage = dataFromServer
                this.dateOfApp = ""
                this.timeOfApp = ""
                this.appDetails = ""
                this.appointmentStatus = ""
            })
        },
        editApp() {
            // TODO: instead list out all of the appointments made by the user when they log in
            // then you can click the app you want to edit
            // then edit that app  
            // apps that are red have been denied
            // apps that are green have been accepted
            // apps that are gray or no color at all are pending
        },
        findUserApp(index) {
            // getter function for the user id associated to the appointment
            for(let i = 0; i < this.appointments.length; i++) {
                if(i === index) {
                    return this.appointments[i].userId
                } 
            }
        },
        acceptApp(userToAccept) {
            $.post('/acceptApp', { id: this.findUserApp(userToAccept) }, dataFromServer => {
                this.appointments = dataFromServer
            })
        },
        declineApp(userToDecline) {
            $.post('/declineApp', { id: this.findUserApp(userToDecline) }, dataFromServer => {
                this.appointments = dataFromServer
            })
        },
    },
    computed: {
        registerDisabled() {
            if(this.registerName === "") return true
            if(this.registerEmail === "") return true
            if(this.registerPassword === "") return true
            return false
        },
        loginDisabled() {
            if(this.loginEmail === "") return true
            if(this.loginPassword === "") return true
            return false
        },
        submitAppDisabled() {
            if(this.dateOfApp === "") return true
            if(this.timeOfApp === "") return true
            return false
        }
    },
    ready() {
        window.addEventListener('unload', console.log("What does this do??"))
    }
}

var app = Vue.createApp(vm).mount('#app')