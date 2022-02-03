let jwt =require('jsonwebtoken')
require('dotenv').config()



const auth = async(req,res,next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1]
        
        if(token){
        let decodedData = jwt.verify(token,process.env.SECRET_TOKEN)

        req.userId = decodedData?.id
        next()
        }
    } catch (err) {
        console.log(err)
    }
    

    
}

module.exports = auth