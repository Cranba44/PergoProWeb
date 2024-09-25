const productModel = require("../Models/productModel")

exports.getAllProduct = async (req, res) => {
    try {

        const allProducts = await productModel.find()
        const resProduct = allProducts.map(product => {
            return {
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                description: product.description,
                image: product.image
            }
        })
        res.status(200).json({
            status: 'succeeded',
            data: resProduct,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const  {id}  = req.params
        const product = await productModel.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: error.message })
    }
}


        
exports.createProduct = async (req, res) => {
            try {
                const newProduct = new productModel({
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                    description: req.body.description,
                    image:req.body.image
                })
                await newProduct.save();
                res.status(200).json({status: 'Succeded', newProduct: newProduct})
            } catch (error) {
                res.status(404).json({status:'Failed', error:error.message})
            }
        }

        exports.updateProduct = async (req, res) => {
            try {
                const  {id}  = req.params;
                const updatedProduct = await productModel.findByIdAndUpdate(id, {
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                    description: req.body.description,
                    image:req.body.image
                }, { new: true })
                res.status(200).json(updatedProduct)
            } catch (error) {
                res.status(500).json({ status: 'Failed', message: error.message })
            }
        }
        

        exports.deleteProduct = async (req, res) => {
            try {
                const {id}  = req.params
                await productModel.findByIdAndDelete(id)
                res.status(200).json({ status: 'Succeeded', message: 'Product deleted' })
            } catch (error) {
                res.status(500).json({ status: 'Failed', message: error.message })
            }
        }