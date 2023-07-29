const path = require('path')

const express = require('express')
const app = express()
const engine = require('express-handlebars').engine()
const router = require('./routes/index.router')
const { default: mongoose } = require('mongoose')

const dbconnection = require('./utils/database')

mongoose.connection.on('open', function () {
    console.log('MongoDB database connection established successfully')
})

app.engine('handlebars', engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, "./views"))

app.use('/', express.static(path.join(__dirname, './public')))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router(app)

app.listen(3000, () => {
    console.log("app is listening to port 3000")
})