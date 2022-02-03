let jwt =require('jsonwebtoken')
require('dotenv').config()



const auth = async(req,res,next) => {
  
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        
        if(token){
        let decodedData = jwt.verify(token,process.env.SECRET_TOKEN)
        
        req.userId = decodedData?.id
        next()
        }else {
          return  res.status(400).json({error: "You have to log in first"})
        }
    } catch (err) {
        res.status(500).json({error: "You have to log in first"})
    }


    
}

module.exports = auth