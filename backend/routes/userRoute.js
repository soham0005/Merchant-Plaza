const router = require('express').Router();
const User = require('../models/userModels');
const authMiddleware = require("../middlewares/authMiddleware")

const {handleNewUser,handleLogin} = require('../controllers/userController');



router.post('/register',handleNewUser);
router.post('/login',handleLogin);


// Protected Routes
// router.get('/get-current-user',authMiddleware,async(req,res)=>{
//     try {
//         const user = await User.findById(req.body.userId);
//         res.status(200).json({
//             status:true,
//             message:"User Found",
//             data:user
//         })
//     } catch (error) {
//         res.status(400).json({
//             status:false,
//             message:error.message,
//         })
//     }
// })

router.get('/get-current-user',authMiddleware,async(req,res)=>{
    try {
        const user  =  await User.findById(req.body.userId);

        res.status(200).json({
            status:true,
            message:"User Fetched Successfully",
            data:user
        })
        
    } catch (error) {
        res.send({status:false,message:error.message});
    }
})


module.exports = router;