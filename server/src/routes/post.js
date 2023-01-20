const router = require('express').Router();
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/handleImages')
const fs = require('fs');
const path = require('path');

router.get('/',async (req,res)=>{
    const {page = 1, search} = req.query;
    try{
        let data;
        let totalResults;
        if(search){
            totalResults = await Post.find({"title" : {$regex : search, $options: '-i'}}).count()
            data = (await Post.find({"title" : {$regex : search, $options: '-i'}}).sort({'createdAt': -1}).populate('user', 'name').skip((page-1) * 5).limit(5));
        }
        else {
            totalResults = await Post.find().count()
            data = (await Post.find().sort({'createdAt': -1}).populate('user', 'name').skip((page-1) * 5).limit(5));
        }
        res.status(200).json({
            status: 'Success',
            totalResults,
            result: [...data]
        });
    }
    catch(e){
        res.status(400).json({
            status: 'Failure',
            message: e.message
        })
    }
})

router.post('/',upload, [
    body('title').isLength({min: 5}),
    body('description').isLength({min: 5})
], (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 'Failure',
            message: errors.array()
        })
    }
    const obj = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        PostImage: req.file.filename,
        user: req.user
    }
    Post.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.status(201).json({
                status: 'Success',
                message: 'Post created successfully',
                item
            })
        }
    });
});

router.put('/:id', upload, async (req, res)=>{
    console.log(req.body)
    try{
        let post = await Post.findOne({ "_id": req.params.id});
        if(post.user.toString() != req.user){
            return res.status(400).json({
                status: 'Failure',
                message: 'You cannot edit someone else posts'
            })
        }
        post = await Post.updateOne({'_id' : req.params.id}, {$set : req.body})
        return res.status(202).json({
            status: 'Success',
            result: post
        })
    }catch(e){
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
})
router.delete('/:id', async (req, res)=>{
    try{
        let post = await Post.findOne({ "_id": req.params.id});
        if(post.user.toString() != req.user){
            return res.status(400).json({
                status: 'Failure',
                message: 'You cannot delete someone else posts'
            })
        }
        post = await Post.deleteOne({ "_id": req.params.id})
        return res.status(202).json({
            status: 'Success',
            result: post
        })
    }catch(e){
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
})

module.exports = router