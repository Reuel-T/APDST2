const express = require('express');
const router = express.Router();
//used for hashing the user password
const bcrypt = require('bcrypt');
//used for managing user sessions, 
//preventing session jacking
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//used for brute force protection
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

//creates user
router.post('/signup', bruteforce.prevent, (req, res, next) => 
{
    bcrypt.hash(req.body.password,10)
    //hashes the user password before storing in DB
    .then(hash => 
        {
            const user = new User(
                {
                    username : req.body.username,
                    email : req.body.email,
                    password : hash,
                    department : req.body.department,
                    admin: req.body.admin
                }
            )
            console.log('user created');
            console.log(user);

            user.save()
            .then(result => 
                {
                    res.status(201).json(
                        {
                            message: 'user created',
                            result: result
                        })
                })
            .catch(err => 
                {
                    res.status(500).json(
                        {
                            error : err
                        })
                });
        });
});




//user login code
router.post('/login', bruteforce.prevent, (req, res, next) => 
{
    let fetchedUser;
    //checks if we have a user with a matching email address
    User.findOne({email: req.body.email})
    .then(user => 
        {
            console.log('user');
            console.log(user);
            //if no match
            if(!user)
            {
                return res.status(401).json(
                    {
                        message : 'Authentication Failed'
                    })
                
            }else
            {
                fetchedUser = user;

                //if we find a valid user, we need to check the password against the one in the db
                //both are hashed, so we need to compare the hashes using bcrypt
                return bcrypt.compare(req.body.password, user.password)
            }
        })
    .then(result => 
        {
            console.log('then result');
            if(!result)
            {
                return res.status(401).json(
                    {
                        message: 'Authentication Failed'
                    });
            }

            //if the passwords match, create a jwt
            const token = jwt.sign(
                {
                    username: fetchedUser.username, 
                    department:fetchedUser.department,
                    admin: fetchedUser.admin
                }, 'secret_this_should_be_longer_time_is',
            {
                expiresIn:'1h'
                //token is given an expiry time to help prevent session jacking
            });
            res.status(200).json({token:token});

        })
    .catch(err => 
        {
            console.log('catch error');
            //This causes a warning, because the response was already sent to 
            //a client. Sever does not crash
            console.log(err);
            return res.status(401).json(
                {
                    message: 'Authentication Failed'
                });
        }); 
});


module.exports = router;