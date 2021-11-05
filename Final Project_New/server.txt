const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcrypt')
const path = require('path')
var dotenv = require('dotenv').config()

// linking my passportConfig.js file wot my server file
// passing my passport, email given by the user when registered and the users id
const initializePassport = require('./passportConfig')
initializePassport(
    passport, // passport i want to set up
    email => users.find(user => user.email === email), // returns where the email is found in my users array (sent to my initialize function)
    id => users.find(user => user.id === id) // returns where the id is found in my users array (sent to my initialize function)
)

var app = express()
app.use(express.static('pub'))
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'pub', 'views')) // moved the 'views' folder into my 'pub' folder, needed to redirect the path so Node.js knew where to look for it

// make a comment here explaining this part in a little more detail later
app.set('view-engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, // name of my secret key (keeps the passwords more secure than usualy)
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

const users = []
var appointments = []


// checks to see if the appointment being submitted is valid:
//      is the appointment time slot already taken by another user?
//      is the date before today's date? ****
//      is the time before/past office hours? ****
function validApp(date, time) {
    if(appointments.length == 0) return true;
    for(let i = 0; i < appointments.length; i++) {
        if(date === appointments[i].date && time === appointments[i].time) {
            return false;
        }
    }
    return true;
}

// finished
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// finished
app.post('/register', async (req, res) => {
    try {
        for(let i = 0; i < users.length; i++) {
            if(users[i].email === req.body.email) throw 'email already taken'
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // encrypting the password of user
        users.push({
            id: Date.now().toString(), // current time stamp user registered
            name: req.body.firstName,
            email: req.body.email,
            password: hashedPassword
        })
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(true))
        res.end()
    } catch(err) {
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(false))
        res.end()
    }
})

app.post('/login', passport.authenticate('local', { failureFlash: true }), (req, res) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].id === req.user.id) {
            if(users[i].status) {
                res.write('You appointment has been accepted!')
                res.end()
            }
            else if(users[i].status === false) {
                res.write('Your appointment has been declined..')
                res.end()
            }
            else if(users[i].status === undefined) {
                res.write('empty') // just filler for now, this is not a good way to do this
                res.end()
            }
        }
    }
})

// sends the array of appointments to the client so they can be listed in bootstrap cards
app.post('/loginAsAdmin', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(appointments))
    res.end()
})

// finished
app.post('/submitApp', (req, res) => {
    var valid = validApp(req.body.date, req.body.time)
    if(valid) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].id === req.user.id) {
                users[i].dateOfApp = req.body.date
                users[i].timeOfApp = req.body.time
                users[i].appInfo = req.body.info
                users[i].status = undefined // undefined == neither accepted nor denied, false == denied, true == accepted
                
                appointments.push({
                    userId: users[i].id, // used for finding the appointment that corresponds with the user who made it
                    name: users[i].name,
                    date: req.body.date,
                    time: req.body.time,
                    info: req.body.info,
                    status: undefined // undefined == neither accepted nor denied, false == denied, true == accepted
                })
                res.write('You appointment has been made, we will notify you when it has been accepted or denied. Have a great day!')
                res.end()
            }
        }
    }
    else {
        res.write('This time slot has already been taken, please pick another time for your appointment.')
        res.end()
    }
})

app.post('/editApp', (req, res) => {
    // TODO: instead list out all of the appointments made by the user when they log in
        // then you can click the app you want to edit
        // then edit that app  
        // apps that are red have been denied
        // apps that are green have been accepted
        // apps that are gray or no color at all are pending
})

app.post('/acceptApp', (req, res) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].id === req.body.id) {
            users[i].status = true
            if(appointments.length > 1) appointments.splice(i, 1)
            else appointments.length = 0
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(appointments))
            res.end()
        }
    }
})

app.post('/declineApp', (req, res) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].id === req.body.id) {
            users[i].status = false
            users[i].dateOfApp = ""
            users[i].timeOfApp = ""
            users[i].appInfo = ""
            if(appointments.length > 1) appointments.splice(i, 1)
            else appointments.length = 0
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify(appointments))
            res.end()
        }
    }
})

app.listen(8080, () => {
    console.log("Server is chilling out in port 8080")
})