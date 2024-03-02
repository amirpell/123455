const jwt = require('jsonwebtoken');
const router = require('../routes/userRoute');
//make sure user signin 
module.exports = (req,res,next) => {

try
{
    const token = req.headers["authorization"].split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {

            if(err){
                return res.status(401).send({
                    message : " auth failed",
                    success: false,
                });
            
            }else{
                req.body.userId = decoded.id;
                next();
            }
        })

}
catch(error){
    return res.status(401).send({
        message : " auth failed",
        success: false
    });
}
}

