require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING);
console.log(CONNECTION_STRING)
module.exports = {

    createUser: (req,res) => {
        let {email, password} = req.body;
        console.log(req.body);
        console.log(email, password)
        sequelize.query(`INSERT INTO users(email, password)
        VALUES('${email}', '${password}');`)
        .then(dbRes => {
            console.log('SUCESSFULLY CREATED USER')
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('ERROR COULD NOT CREATE USER', err))
    }, 

    getLogin: (req, res) => {
        let {email, password} = req.body;
//vulnerable to SQL injection try doing a SQL injection with INSERT INTO... 
        sequelize.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`)
        .then(dbRes => {
            console.log('GOT USER!')
            if (dbRes[0].length === 0) {
                console.log('ERROR GETTING USER')
                res.status(403).send('Invalid login');
            } else {
            res.cookie('email', email) //store user id and email in cookie.
            res.cookie('user_id', dbRes[0][0].id)
            console.log(dbRes[0][0].id)
            res.status(200).send(dbRes[0])
            console.log(dbRes[0])
        }
         }).catch(err => {
            console.log('ERROR GETTING USER')
            res.status(403).send('Invalid login');
         })
 //if credentials exist tell them to login
    },

    addPassword: (req, res) => {

        let {site, user, pass} = req.body;
        console.log(req.body)
        console.log(req.cookies)

        sequelize.query(`INSERT INTO credentials(website, username, password, user_id)
        VALUES('${site}', '${user}', '${pass}', ${req.cookies['user_id']});`)
        .then(dbRes => {
            console.log('SUCCESSFULLY ADDED NEW PASSWORD!')
            res.status(200).send(dbRes[0])
        }).catch(err => {
            console.log('ERROR ADDING PASSWORD!')
        })
    },

getCredentials: (req, res) => {
    const userId = req.cookies['user_id']

    sequelize.query(`SELECT * FROM credentials JOIN users  `)
}
// getCredentials: (req, res) => {

//     req.cookies(['email', email])

//     sequelize.query(`SELECT * FROM credentials JOIN users 
//     ON users `)
//     // getCredentials: (req...)
//     //in here need to /To get a cookie:  req.cookies['email']
//     //To get a cookie:  req.cookies['email']
//     //save a cookie res.cookie to get one it's req.cookies
//     //after getting the cookie: 
//     //then sequelize a JOIN query to get all credentials matching user email 
//     //join credentials and users 
//     //and send this as response res.send
// },  
   
}

