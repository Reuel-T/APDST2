const express = require('express');
const router = express.Router();

const Post = require('../models/post');

//uses this method to check if the user is in a valid session (logged in)
//Used in creating, retrieving and deleting posts (Authentication)
//if the user is not logged in or in an invalid session
//the request will be denied
const CheckAuth = require('../middleware/check-auth');


//create a post
router.post('',CheckAuth, (req, res, next) => 
{
    console.log('CREATE POST');
    const posts = new Post(
        {
            username : req.body.username,
            department :req.body.department,
            date: req.body.date,
            postContent : req.body.postContent,
            adminPost: req.body.adminPost
        })
    posts.save()
    .then((createdPost) => 
    {
        console.log('POST CREATION');
        console.log(createdPost);
        res.status(201).json(
            {
                message: 'post created',
                orderID: createdPost._id
            }
        )
    })
    console.log(posts);
});

//get posts
router.get('', CheckAuth, (req, res, next) => 
{
    Post.find().then((documents) => 
    {
        res.json(
            {
                message: 'posts got got',
                posts: documents.reverse()
            })
        console.log('Posts Returned to client');
    })
});

//delete a post
router.delete('/:id', CheckAuth,(req,res,next) => 
{
    Post.deleteOne({_id: req.params.id})
        .then(result => 
            {
                res.status(200).json({message : 'Post Deleted'})
                console.log('Post Deleted from DB');
            });
});

module.exports = router;