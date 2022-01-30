require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StreetartModel = require("./models/Streetart");

const app = express();

//allows us to receive information from the front end in json format
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({
    extended: false
  }));

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,useUnifiedTopology:true
}).then(()=>{console.log('Connection open!')
}).catch(err=>{
    console.log('OH NO! We have a problem with database connection')
    console.error(err)
})


const streetartsRouter = require('./routes/streetarts.js')
app.use('/streetarts', streetartsRouter)



app.listen(3007, () => {
    console.log('Server running on port 3007..');
});