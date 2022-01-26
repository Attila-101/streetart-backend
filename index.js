const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const StreetArtModel = require("./models/StreetArt");

//allows us to receive information from the front end in json format
app.use(express.json)
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin123@streetart.ifsfv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post("/", async (req, res) => {
    const streetart = new StreetArtModel({ title: "Mural" });

    try {
        await streetart.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err);
    }
});

app.listen(3003, () => {
    console.log('Server running on port 3003..');
});