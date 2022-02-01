
const express = require("express");
const router = express.Router();
const Streetart = require('../models/Streetart')


const { getPost,getPosts,createPost,getPostByTitle,updatePost,deletePost,getArt, findTitle } = require("../controllers/posts");



router.post('/', createPost);
router.get('/byid/:id', getArt, getPost);
router.get('/bytitle/q=:title', getPostByTitle);
router.patch('/:id', getArt, updatePost);
router.delete('/:id', getArt, deletePost);
router.get('/all/', getPosts);
// router.get('/bytitle/q=:title',findTitle)
// router.patch('/:id/likePost', likePost);

module.exports= router;


