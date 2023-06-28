const router = require('express').Router();
const User = require('../models/userModels');

const {handleNewUser,handleLogin} = require('../controllers/userController');



router.post('/register',handleNewUser);
router.post('/login',handleLogin);


module.exports = router;