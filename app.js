const express = require('express')
logger = require("morgan")
const app = express()
const path = require('path');
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
var session = require('express-session')    

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

const rosterRoute = require('./routes/routes')
app.use('/', rosterRoute)

app.listen(port, () => console.log(`Roster App listening on port ` + port))

