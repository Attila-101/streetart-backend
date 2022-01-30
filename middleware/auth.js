let jwt =require('jsonwebtoken')
require('dotenv').config()



const auth = async(req,res,next) => {

    try {
        const token = req.headers.authorization
        
        let decodedData = jwt.verify(token,process.env.SECRET_TOKEN)

        req.userId = decodedData?.id

        next()
    } catch (err) {
        console.log(err)
    }



}

module.export= auth; 