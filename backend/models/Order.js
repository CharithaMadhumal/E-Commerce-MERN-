import mongoose from "mongoose";


const orderSchema = mongoose.Schema({

    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 }
        }
    ],

    totalAmount:{type: Number, required: true},
    paymentMethod:{type: String, enum:['card', 'koko', 'initpay'], required: true},
    paymentStatus:{type: String, enum:['pending', 'completed', 'failed'], default: 'pending'}

},{timestamps: true});

const Order = mongoose.model('Order',orderSchema);
export default Order;

