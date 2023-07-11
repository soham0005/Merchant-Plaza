const Product = require("../models/producModels");

const addProduct = async(req,res)=>{
        try {
            
            const newProduct = new Product(req.body);
            await newProduct.save();

            res.status(200).json({status:true,message:"Product Added Successfully"})

        } catch (error) {
            res.status(400).json({status:false,message:error.message});
        }
}

const getProducts = async(req,res)=>{
    try {

        const products = await Product.find();
        res.status(200).json({status:true,message:products});

    } catch (error) {
        res.status(400).json({status:false,message:error.message});
    }
}

module.exports = {addProduct,
    getProducts}