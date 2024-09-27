const express = require ('express')
const router = express.Router()
const {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct} = require('../Controllers/productController');


router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.delete('/deleteProduct/:id', deleteProduct)
router.patch('/update/:id', updateProduct)
router.post('/createProduct/:id', createProduct)

module.exports = router