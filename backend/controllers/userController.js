
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleNewUser = async (req, res) => {

    try {

        const { email, password, fullName } = req.body
        const user = await User.findOne({ email });

        if (user) {
            throw new Error("User Already Exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        console.log(email, hashedPassword, email);
        const newUser = await User.create({
            fullName,
            password: hashedPassword,
            email
        })

        res.status(200).json({
            status: "Success",
            message: "User Created Successfully"
        })

    } catch (error) {
        res.send({
            status: false,
            message: error.message
        })
    }
}




const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        console.log("user Found:",user);

        if (!user) {
            throw new Error("User not Found");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error("Invalid Credentials");



        const token = jwt.sign({ userId: user._id }, "merchantPlaza");
        console.log("token",token);

        res.status(200).json({
            status: true,
            message: "Login Success",
            token:token
        })




    } catch (error) {
        res.send({
            status: false,
            message: error.message
        })
    }

}


module.exports = {
    handleNewUser, handleLogin
}