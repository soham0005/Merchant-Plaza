const router = require("express").Router();
const Product = require("../models/producModels");
const authMiddleware = require('../middlewares/authMiddleware');
const {addProduct,getProducts,editProduct,deleteProduct} = require('../controllers/productController')


// Add New product
router.post('/add-product',authMiddleware,addProduct)


// Get all Products
router.get('/get-products',getProducts)

// Edit Product
router.put('/edit-product/:id',authMiddleware,editProduct);

router.delete('/delete-product/:id',authMiddleware,deleteProduct);

module.exports = router;