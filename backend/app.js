const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const app = express();
const path = require('path');

//morgan for logging
const morgan = require('morgan');

//using SSL to connect to mongoDB
const cert = fs.readFileSync('keys/certificate.pem');
const options = {server : {sslCA : cert}};

//uses body parser to read json objects
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//connects to database
mongoose.connect("mongodb+srv://admin:admin@apds-poe-cluster.uvmus.mongodb.net/apds-poe?retryWrites=true&w=majority")
    .then(() => 
    {
        console.log('connected to db');
    })
    .catch(() => 
    {
        console.log('unable to connect to db');
    })

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//morgan token to log the body of a request
morgan.token('tbody',(req) => {
    let string = '';
    if(req.body)
    {
        string += `REQ BODY -> ${JSON.stringify(req.body)}`;
    }
    return string;    
})

//Logs requests to a log file
//app.use(morgan('DATE -> :date[clf]\t| METHOD -> :method| URL -> :url\t| STATUS -> :status\t| RESPONSE TIME -> :response-time ms\t|BODY -> :tbody', { stream: accessLogStream }));
//Logs requests
app.use(morgan('REQ\t| DATE -> :date[clf]\t| METHOD -> :method| URL -> :url\t| STATUS -> :status\t| RESPONSE TIME -> :response-time ms\t|BODY -> :tbody', {
    immediate: true,
    stream: accessLogStream
  }));

// Logs responses
app.use(morgan('RES\t| DATE -> :date[clf]\t| METHOD -> :method| URL -> :url\t| STATUS -> :status\t| RESPONSE TIME -> :response-time ms', {
    stream: accessLogStream
  }));

//Allowing CORS
app.use((req, res, next) => 
{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Headers",
    //X Requested With - Used to prevent Cross Site Scripting (XSS)
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods","*");
    //X-Frame-Options and Content-Security-Policy fpr Frame Busting
    res.setHeader('X-Frame-Options', 'sameorigin');
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self';");
    next();
});

//use the routes defined in routes.posts.js/users.js
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;