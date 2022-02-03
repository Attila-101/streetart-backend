
const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth')
const { getPost,getPosts,createPost,getPostByTitle,updatePost,deletePost,getArt, likePost } = require("../controllers/posts");



router.post('/',auth,  createPost);
router.get('/byid/:id', getArt, getPost);
router.get('/bytitle/q=:title', getPostByTitle);
router.patch('/:id', getArt,auth, updatePost);
router.delete('/:id', getArt,auth, deletePost);
router.get('/', getPosts);
// router.get('/bytitle/q=:title',findTitle)
router.patch('/:id/likePost',auth, likePost);

module.exports= router;


