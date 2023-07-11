const router = require("express").Router();
const Product = require("../models/producModels");
const authMiddleware = require('../middlewares/authMiddleware');
const {addProduct,getProducts} = require('../controllers/productController')


// Add New product
router.post('/add-product',authMiddleware,addProduct)


// Get all Products
router.get('/get-products',getProducts)


module.exports = router;