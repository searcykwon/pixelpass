require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const { createUser } = require('./controller.js')

app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile("client/index.html", {root: __dirname});
});

// app.post('/login', ) //write code for what's going to happen
    //look at madlibs lab

app.post('/register', createUser)


//if user exists direct to manager.html if not back to homepage
//need a way to track if ur logged in --look up cookies
//get it to print out 
//every time i'd need to submit a form it will sign you out