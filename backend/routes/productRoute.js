const router = require("express").Router();
const Product = require("../models/producModels");
const authMiddleware = require('../middlewares/authMiddleware');
const {addProduct,getProducts,editProduct,deleteProduct} = require('../controllers/productController')
const cloudinary = require("../dbConfig/cloudinaryConfig");
const multer = require("multer");


// Add New product
router.post('/add-product',authMiddleware,addProduct)


// Get all Products
router.post('/get-products',getProducts)

// Edit Product
router.put('/edit-product/:id',authMiddleware,editProduct);

router.delete('/delete-product/:id',authMiddleware,deleteProduct);


const storage = multer.diskStorage({
    filename: function (req,file,callback){
        callback(null,Date.now() + file.originalname);
    },
});

router.post('/upload-image-to-product',authMiddleware,multer({storage:storage}).single('file'),async(req,res)=>{
    try {
        console.log("Inside backend of upload route");
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:"marketplaza"
        });

        const productId = req.body.productId;
        console.log("Product ID",productId);
        await Product.findByIdAndUpdate(productId,{
            $push: {images:result.secure_url},
        })
        res.send({
            status:true,
            message:"Image Uploaded Successfully",
            data:result.secure_url
        })
    } catch (error) {
        console.log(error.message);
        res.send({
            status:false,
            message:error.message,
        })
    }
})

module.exports = router;