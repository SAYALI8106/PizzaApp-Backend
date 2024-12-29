const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],
        minLenght:[5, "Product Name must be at least 5 characters long"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLenght:[5, "Description must be at least 5 characters long"],
    },
    productImage: { 
        type: String,
    },
    price: {
        type: Number,   
        required: [true, "Price is required"],
    },
    category :{
        type: String,
        enum:["veg", "non-veg", "drinks","sides"],
        default: "veg"
    },
    inStock:{
        type:Boolean,
        required: [true, "In stock status is required"],
        default: true
    }
},{
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;