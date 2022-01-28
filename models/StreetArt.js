const mongoose = require('mongoose')
const Schema = mongoose.Schema
//mogoose schema for the data
const streetartSchema = new Schema({
  
    title: {
        type: String
        },
    artist: {
            type:String
        }, 
    year: {type:Number
        },
    active: {type:Boolean
        },
    image: {type: String,
            required:true
        },
    thumbnail: {type:String
        },
    location: {
            zip:{type:Number,
                required:true,
                default:101
            },
            street:{type: String
            },
            coordinates:{
                longitude:{type:Number
                },
                latitude:{type:Number
                } 
            }
        },

    social: {
            originalPoster:{type:String
            },
            likes:{type:Number
            },
            comments:{type:Array
            }
        },

        
    dateCreate:{type:Date
            },
    dateEdit:{type:Date
            }
        
        
    
}


);

module.exports = mongoose.model("Streetart", streetartSchema);
