const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productsSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false 
    }
})


const products = mongoose.model("Products",productsSchema, "products")

module.exports = products