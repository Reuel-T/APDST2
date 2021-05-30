const app = require('./backend/app');
//needed debug here to actually allow https access
const debug = require("debug")("node-angular");
const http = require('https');
const fs = require('fs');

const server = http.createServer(
    {
        //using ssl to allow https access
        key:  fs.readFileSync('./keys/privatekey.pem'),
        cert: fs.readFileSync('./keys/certificate.pem') 
    }, app
);

const port = (process.env.PORT || 3000);

app.set('port', port);

server.listen(port);
console.log(`Sever listening on Port ${port}`);