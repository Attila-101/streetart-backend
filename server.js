require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js')
const postRoutes = require('./routes/posts.js')
const cookieParser = require('cookie-parser')

const app = express();


mongoose.connect(process.env.DATABASE_URL, {
}).then(()=>{console.log('Connection open!')
}).catch(err=>{
    console.log('OH NO! We have a problem with database connection')
    console.error(err)
})

//middleware 
app.use(bodyParser.json())
app.use(express.json())
app.use(cors());
app.use(cookieParser())


app.use('/posts', postRoutes)
app.use('/api', authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});