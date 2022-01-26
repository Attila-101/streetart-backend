const mongoose = require('mongoose')

//mogoose schema for the data
const StreetartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
});

const Streetart = mongoose.model("Streetart", StreetartSchema);
module.exports = Streetart;