require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs');
var crypto = require('crypto');

const sequelize = new Sequelize(CONNECTION_STRING);
console.log(CONNECTION_STRING)
module.exports = {

    createUser: (req,res) => {
        let {email, password} = req.body;
        console.log(req.body);
        console.log(email, password)
        //check if email and password are empty
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        console.log(passwordHash);
        sequelize.query('INSERT INTO users(email, password) VALUES(:email, :password)', 
        {
            replacements: { email, password:passwordHash }, //password:passwordHash bc password is key & hash is value
            type: sequelize.QueryTypes.INSERT
        })
        .then(dbRes => {
            console.log('SUCESSFULLY CREATED USER')
            res.status(200).send(dbRes[0])
        }).catch(err => console.log('ERROR COULD NOT CREATE USER', err))
    }, 

    getLogin: (req, res) => {
        let {email, password} = req.body;
//vulnerable to SQL injection try doing a SQL injection with INSERT INTO... 
        sequelize.query('SELECT * FROM users WHERE email = :email', 
        {
            replacements: {email, password}, 
            type: sequelize.QueryTypes.SELECT
        })
        .then(dbRes => {
            console.log('GOT USER!')
            if (dbRes.length > 0 && bcrypt.compareSync(password, dbRes[0].password)) {
                res.cookie('email', email) //store user id and email in cookie.
                res.cookie('user_id', dbRes[0].id)
                console.log(dbRes[0].id)
                res.status(200).send(dbRes[0])
                console.log(dbRes[0]) 
            } else {
                console.log('ERROR GETTING USER') //make a client error 
                res.status(403).send('Invalid login');
            }  //this is dbRes 0 and was dbRes[0][0] because we wanted to get the first item in the array
        //
         }).catch(err => {
            console.log('ERROR GETTING USER')
            res.status(403).send('Invalid login');
         })
 //if credentials exist tell them to login
    },

    verifyUser: (req, res) => {
        const userid = req.cookies['user_id'] 
        //variable that checks for the cookie
        if (userid === undefined) {
            res.redirect('/index.html')
        } else {
            res.sendFile("client/manager.html", {root: __dirname + '/../'}) //root dirname is the folder where it starts looking for file
        }
    },

    addPassword: (req, res) => {

        let {site, user, pass} = req.body;
        console.log(req.body);
        console.log(req.cookies);
        
        //generate the random encryption key 
        function generateEncryptionKey() {
            return crypto.randomBytes(32).toString('hex');//generates 32bytes .toString method
            //takes the randomBytes and makes it a hexa string
        }
        

        //query should not go through if user types in nothing
        
      
        if (user === '' || site === '' || pass === '') {
            res.status(403).send('');
            console.log('NO PASSWORD TO ENTER')
        } else { sequelize.query(  
            'INSERT INTO credentials(website, username, password, user_id) VALUES(:site, :user, :pass, :userId)',
            {
                replacements: {
                    site,
                    user,
                    pass,
                    userId: req.cookies['user_id']
                },
                type: sequelize.QueryTypes.INSERT
            }
        )
        .then(dbRes => {
            res.status(200).send(dbRes)
            console.log('SUCCESSFULLY ADDED NEW PASSWORD!')
        }).catch(err => {
            console.log('ERROR ADDING PASSWORD!')
        })
    }},

getCredentials: (req, res) => {
    const userid = req.cookies['user_id']

    sequelize.query('SELECT * FROM credentials WHERE user_id = :userid', 
    {   
        replacements: { userid }, 
        type: sequelize.QueryTypes.SELECT
    })
    .then(dbRes => {
        res.send(dbRes)
    }).catch(err => {
        console.log('ERROR GETTING CREDENTIALS', err)
    })
},


deletePassword: (req, res) => {
    const userid = req.cookies['user_id']
    const { id } = req.params //all of the variables in url
    //i need to find the id of the data the user is trying to delete and delete it from the database 

    sequelize.query('DELETE FROM credentials WHERE user_id = :userid AND id = :id', {
        replacements: {userid, id}, 
        type: sequelize.QueryTypes.DELETE
    })
    .then(dbRes => {
        res.status(200).send('SUCCESSFULLY DELETED PASSWORD') 
        console.log('SUCCESSFULLY DELETED PASSWORD')
    })
}, 

updatePassword: (req, res) => {
    const userid = req.cookies['user_id']
    const { id } = req.params

    let {site, user, pass} = req.body;

    sequelize.query(
        `UPDATE credentials SET website = :site, username = :user,
        password = :pass WHERE user_id = :userid AND id = :id`, {
            replacements: 
            {userid,
            id, 
            site, 
            user,
            pass, 
            }, 
            type: sequelize.QueryTypes.UPDATE
        }) 
        .then(dbRes => {
            res.status(200).send(dbRes[0])
            console.log('USER SUCCESSFULLY UPDATED')
        }).catch(err => {
            console.log('COULD NOT UPDATE PASSWORD', err)
        })
}, 

// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;

clearCookies: (req, res) => {
    res.clearCookie('user_id')
    res.clearCookie('email')
    res.redirect('/')
} 



// getCredentials: (req, res) => {

//     req.cookies(['email', email])

//     sequelize.query(`SELECT * FROM credentials JOIN users 
//     ON users `)
//     // getCredentials: (req...)
//     //in here need to /To get a cookie:  req.cookies['email']
//     //To get a cookie:  req.cookies['email']
//     //save a cookie = res.cookie to get one it's req.cookies
//     //after getting the cookie: 
//     //then sequelize a JOIN query to get all credentials matching user email/id
//     //join credentials and users 
//     //and send this as response res.send
// },  
   
}

