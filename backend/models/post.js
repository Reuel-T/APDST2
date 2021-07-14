const mongoose = require('mongoose');

//used to encrypt posts that are saved
const encrypt = require('mongoose-encryption');

const postSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        department: {type: String, required: true},
        date : {type: Date, required: true},
        postContent: {type: String, required: true},
        adminPost : {type: Boolean, required: true}
    }
);

/*
    THE KEYS SHOULD BE IN ENVIRONMENT VARIABLES
    Because this is a submission and I have no control over the
    host machine, they're declared here
*/

const encKey = 'y7IU1cJ36lNmKEe195jmz47nhAKCjryGyqqDgI48DZE';
const sigKey = 'Ml8Z5J8j8n67IGT26CW43kKm6Aby8hAUbwVPyAz_q0gNroZWqufmMx9oHlfParqFhSruQjgURyjSKy0OQgxNng';

postSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });

module.exports = mongoose.model('Post', postSchema);

/* SAMPLE POST BECAUSE IM UNORIGINAL AND CANT BE BOTHERED TO CREATE NEW ONES FOR TESTING
<script> console.log('You should sanitize more often');</script> This is a post that has some content, it has a script, that should be removed, Hopefully the script is gone. Here's an HTML entitiy, &lt; as well as some text that hopefully is <b> bold </b>
*/