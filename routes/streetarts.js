let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()
    const multer = require("multer");
    const {
      GridFsStorage
    } = require("multer-gridfs-storage");

    const storage = new GridFsStorage({
        url: process.env.DATABASE_URL,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
              filename: filename,
              bucketName: "newBucket"
            };
            resolve(fileInfo);
          });
        }
      });
      
      const upload = multer({
        storage
      });

    //create a model 
    let Streetart = require('../models/Streetart')


    //post a piece 
    router.post('/add', upload.single("image"), async (req,res)=>{

        const streetart = new Streetart({
            _id:req.body._id,
            title:req.body.title,
            artist:req.body.artist,
            year:req.body.year,
            active:req.body.active,
            image:req.file.originalname,
            thumbnail:req.body.thumbnail,
            zip:req.body.zip,
            street:req.body.street,
            longitude:req.body.longitude,
            latitude:req.body.latitude,
            dateCreate:Date.now()
        
    })
    try{
        const newStreetart = await streetart.save()
        
        res.status(201).json(newStreetart)
    } catch (err){ 
        res.status(400).json({message:err.message})

    }

})


//Get All pieces


router.get('/get',async (req, res) =>{
    try {
        const streetarts = await Streetart.find()
        res.json(streetarts)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

//Get by ID 

router.get('/get/byid/:id',getArt,(req,res)=>{
    res.json(res.art)
})


//Somewhere at this point I realised that accidental ctrl + Z with nodemon on sends application into the background
//together with the bounded port, then  throw unhandled error - not nice - 2/10. 

//Get by title
//something is wrong with event handling on 404 - I couldn't get into it ...
router.get('/get/bytitle/:title', async (req,res) => {
    let arts 
    try {
        console.log('req: ', req.params)
        arts = await Streetart.find({title:req.params.title})
        console.log(res.body)
       if(arts.lenght=0){
            return res.status(404).json({message: `We don't have: (${title})
            This artwork in our database`})
        }
    } catch (err){
        return res.status(500).json({message: err.message})
    }
    res.status(200).json(arts)

})


router.patch('/update/:id',getArt,async (req,res) => {
    
    if(req.body.title!=null){
        res.art.title = req.body.title}
    if(req.body.artist!=null){
        res.art.artist = req.body.artist}
    if(req.body.year!=null){
        res.art.year = req.body.year}
    if(req.body.active!=null){
        res.art.active = req.body.active}
    if(req.body.image!=null){
        res.art.image = req.body.image}
    if(req.body.thumbnail!=null){
        res.art.thumbnail = req.body.thumbnail}
    if(req.body.zip!=null){
        res.art.zip = req.body.zip}
    if(req.body.longitude!=null){
        res.art.longitude = req.body.longitude}
    if(req.body.latitude!=null){
        res.art.latitude = req.body.latitude}
    if(req.body.street!=null){
        res.art.street = req.body.street}
   
     try {
         if (Object.getOwnPropertyNames(req.body).length == 0){return res.status(303).json ({message: `lack of key value pairs in body. Need parameters to edit document.`})}
        const updatedArt = await res.art.save()
        res.json(updatedArt)
     } catch {
         res.status(400).json({message:err.message})

     }


})


//Delete by Id 

router.delete('/delete/:id',getArt,async (req,res) => {
    try{
        const deletedArt = await res.Art
        res.art.remove()
        
        res.json({message: `${deletedArt.title} by ${deletedArt.artist} has been deleted`})
    } catch {
        res.status(400).json({message:err.message})
    }

})


// find by the ID

async function getArt (req,res,next) {
    let art
    try{
        art = await Streetart.findById(req.params.id)
            if(art ==null) {
                return res.status(404).json({message: `Unfortunately we cannot find what You're looking for. Try again with different id`})
            }
            } catch (err) {
                return res.status(500).json({message:err.message})
            }
    res.art = art
    next()
}

    module.exports = router