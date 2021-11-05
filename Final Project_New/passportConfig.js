// this file is where i set up my passport so my login feature can work properly
// passing our passport through the initialize function

// LocalStrategy is a a module that let's me authenticate a username and password
// this uses 'passport-local'
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// the done() function comes with passport and passport-local
// it is basically called when everything else is 'done' in the function
// the varify callback calls done() 
// tons of documentation for done() at: http://www.passportjs.org/docs/configure/
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if(user == null) {
            return done(null, false, { message: 'No user with that email' }) // the email given by the user has not been registered
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user) // email and password was correct, returns the user they have logged in as
            }
            else {
                return done(null, false, { message: "Password is incorrect" }) // the password given by the user did not match a known password (password doesn't match any email)
            }
        } catch(e) {
            done(e)
        }
    }

    // creating a new LocalStrategy here that takes in two fields
    // the username (email in my case)
    // and a password, but with passport-local the password field defaults to password, and since i called my passowrd 'password' i don't think i need to pass my password as a field
    // then calls my authenticateUser function that actually authenticates the user's email and password
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    // serializeUser() figures out what data of the user object should be stored in the session
    passport.serializeUser((user, done) => done(null, user.id))

    // the first argument here (id) is used to find the corrosponding key in memory
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))

    })
}

// exporting the initialize function, so we can call this function
module.exports = initialize