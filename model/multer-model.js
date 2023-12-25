const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }

});

const Product = new mongoose.model('product', userSchema);

module.exports= Product;