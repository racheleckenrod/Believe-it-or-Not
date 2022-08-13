const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
// const { default: mongoose } = require('mongoose')

// load config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Logging in console
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars - using '.hbs' instead of '.handlebars' (?) 
// needed to use 'exphbs.engine'  instead of just 'exphbs' like it showed in the video
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// express-session middleware - needs to be above passport middleware
app.use(
    session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({mongooseConnection: mongoose.connection })
}))

// Set passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))



// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)