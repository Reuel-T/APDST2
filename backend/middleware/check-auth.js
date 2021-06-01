const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => 
{
    //used to verify the session of a user
    //if true, the user is signed in, and the request can be processed
    //else, the session is invalid and the user will have to sign in again
    try 
    {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret_this_should_be_longer_time_is');
        console.log('Token Verified');    
        next();
    } catch (error) 
    {
        console.log('MIDDLEWARE ERROR');   
        res.status(401).json(
            {
                message: 'Unauthorized Request'
            }
        );    
    }
};