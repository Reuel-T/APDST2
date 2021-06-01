const express = require('express');
const Post = require('./models/post');
const mongoose = require('mongoose');
const fs = require('fs');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const app = express();

//using ssl to connect to mongoDB
const cert = fs.readFileSync('keys/certificate.pem');
const options = {server : {sslCA : cert}};

//uses body parser to read json objects
const bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:admin@apds-poe-cluster.uvmus.mongodb.net/apds-poe?retryWrites=true&w=majority")
    .then(() => 
    {
        console.log('connected to db');
    })
    .catch(() => 
    {
        console.log('unable to connect to db');
    })

//Allowing CORS
app.use((req, res, next) => 
{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods","*");
    next();
});

//use the routes defined in routes.posts.js/users.js
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;