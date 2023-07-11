const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    try {

        const token = req.header("authorization").split(" ")[1];
        const decryptedToken = jwt.verify(token,"merchantPlaza");
        
        //attaching that id to body
        req.body.userId = decryptedToken.userId;
        next();
        
    } catch (error) {
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
}