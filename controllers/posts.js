const Streetart = require("../models/Streetart");
const {json} = require("body-parser");
const { Mongoose } = require("mongoose");
//post a piece

module.exports.createPost = async (req, res,next) => {
  const streetart = new Streetart({
    _id: req.body._id,
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
    active: req.body.active,
    image: req.body.image,
    thumbnail: req.body.thumbnail,
    location: {
      zip: req.body.zip,
      street: req.body.street,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
  });
  try {
    const newStreetart = await streetart.save();

    res.status(201).json(newStreetart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//Get All pieces

module.exports.getPosts = async (req, res,next) => {
  try {
    const streetarts = await Streetart.find();
    res.json(streetarts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//Get by ID

module.exports.getPost = async (req, res,next) => {
    
  res.json(res.art);
}

//Get by title

module.exports.getPostByTitle = async (req, res,next) => {
  
  let arts;
  try {
    const title = await req.params.title
    //regex looking in case insensitive manner, titles including {title} param 
    arts = await Streetart.find({ title:{"$regex" : title ,$options:'i'}});
   
    if (arts.length === 0) {
      return res.status(404).json({ message: `We don't have: (${title}) in our database` });
    }
    res.status(200).json(arts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//update art info

module.exports.updatePost = async (req, res,next) => {
    
  if (req.body.title != null) {
    res.art.title = req.body.title;
  }
  if (req.body.artist != null) {
    res.art.artist = req.body.artist;
  }
  if (req.body.year != null) {
    res.art.year = req.body.year;
  }
  if (req.body.active != null) {
    res.art.active = req.body.active;
  }
  if (req.body.image != null) {
    res.art.image = req.body.image;
  }
  if (req.body.thumbnail != null) {
    res.art.thumbnail = req.body.thumbnail;
  }
  if (req.body.zip != null) {
    res.art.zip = req.body.zip;
  }
  if (req.body.longitude != null) {
    res.art.longitude = req.body.longitude;
  }
  if (req.body.latitude != null) {
    res.art.latitude = req.body.latitude;
  }
  if (req.body.street != null) {
    res.art.street = req.body.street;
  }

  try {
    if (Object.getOwnPropertyNames(req.body).length == 0) {
      return res
        .status(303)
        .json({
          message: `You have parsed exatly same data. There is nothing to change.`,
        });
    }

    const updatedArt = await res.art.save();
    res.json(updatedArt);
  } catch {
    res.status(400).json({ message: err.message });
  }
}

//Delete by Id

module.exports.deletePost = async (req, res) => {
   
  try {
    const deletedArt = await res.art;
    res.art.remove();

    res.json({
      message: `${deletedArt.title} by ${deletedArt.artist} has been deleted`,
    });
  } catch {
    res.status(500).json({ message: err.message });
  }
}

// find by the ID


module.exports.getArt = async (req, res, next) =>{
  let art;
  try {
    art = await Streetart.findById(req.params.id);
    if (art == null) {
      return res
        .status(404)
        .json({
          message: `Unfortunately we cannot find what You're looking for. Try again with different id`,
        });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.art = art;
  next();
}

//Like the post 
module.exports.likePost = async (req,res)=>{
    const {id} = req.params;

    if(!req.userId) return res.json({message:"Unauthenticated"})

    if(!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`There is no post with ${id}`)
 
    const post = await Streetart.findById(id)

    const index = post.social.likes.findIndex((id)=>id=== String(req.userId))

  
    if (index ===-1) {
      post.social.likes.push(req.userId)
    } else {
      post.social.likes = post.social.likes.filter((id)=> id!=String(req.userId))
    }
  
 

}
