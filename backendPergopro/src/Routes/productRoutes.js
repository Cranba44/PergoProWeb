const express = require ('express')
const router = express.Router()
const {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct} = require('../Controllers/productController');


router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/:id', createProduct)

module.exports = router