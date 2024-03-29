require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
app.use(express.static(__dirname + '/../client'));
console.log(__dirname + '/../client')
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(express.json());
const {SERVER_PORT} = process.env
const { createUser, getLogin, addPassword, getCredentials, verifyUser, deletePassword, updatePassword, clearCookies} = require('./controller.js')

app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile("../client/index.html", {root: __dirname});
});

app.get('/viewpasswords', verifyUser) //if they try to get manager.html it will run the verifyUser function

// app.post('/login', ) //write code for what's going to happen
    //look at madlibs lab

app.post('/register', createUser)
app.post('/login', getLogin) 

app.post('/manager', addPassword)
app.get('/manager', getCredentials)
app.delete('/manager/:id', deletePassword) //:id puts a variable in url, 
app.put('/manager/:id', updatePassword)
app.get('/logout', clearCookies)

//if user exists direct to manager.html if not back to homepage
//need a way to track if ur logged in --look up cookies
//get it to print out 
//every time i'd need to submit a form it will sign you out


//app.get/credn
// app.pget('/credentials', controller function: getCredentials)