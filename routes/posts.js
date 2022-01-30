
const express = require("express");
const router = express.Router();
const Streetart = require('../models/Streetart')


const { getPost,getPosts,createPost,getPostByTitle,updatePost,deletePost,getArt } = require("../controllers/posts");



router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getArt, getPost);
router.get('/:title', getPostByTitle);
router.patch('/:id', getArt, updatePost);
router.delete('/:id', getArt, deletePost);
// router.patch('/:id/likePost', likePost);

module.exports= router;


