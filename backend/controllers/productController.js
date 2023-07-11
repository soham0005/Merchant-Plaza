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

        const products = await Product.find().sort({createdAt : -1});
        res.status(200).json({status:true,message:products});

    } catch (error) {
        res.status(400).json({status:false,message:error.message});
    }
}

const editProduct = async(req,res) =>{
    try {
        console.log(`Product Id and body:${req.params.id}:${req.body}`)
        await Product.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json({status:true,message:"Product Updated Successfully"})
    } catch (error) {
        res.status(400).json({status:false,message:error.message});
    }
}

const deleteProduct = async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({status:true,message:"Delete Successfull"});
    } catch (error) {
        res.status(400).json({status:false,message:error.message});
    }
}


module.exports = {addProduct,editProduct,
    getProducts,deleteProduct}