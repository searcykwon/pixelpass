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
        sequelize.query(``
 //if credentials exist tell them to login
        )
    },
}
