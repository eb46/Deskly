// Dependencies
const express = require('express')
const cors = require('cors')
const desk_pool = require('./database.js')
const session = require('express-session')

// Configuration
const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

// Controllers
const deskController = require('./controllers/desk_controller.js')
app.use('/', deskController)

// const usersController = require('./controllers/users_controller.js')
// app.use('/users', usersController)
//
// const sessionsController = require('./controllers/sessions_controller.js')
// app.use('/sessions', sessionsController)

// Routes



app.listen(PORT, () => {
  console.log(`server has started on ${PORT}!`);
})