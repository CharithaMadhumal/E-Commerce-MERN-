import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
   
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true, enum: ['Ladies', 'Gents', 'Unisex']},
    image: {type:String},
    stock:{type:Number, default:0},
    discountPercentage: {type: Number, default: 0},
    isOffer:{type: Boolean, default: false}



},{timestamps: true});

const Product = mongoose.model('Product',productSchema);
export default Product;