import mongoose from "mongoose";

 const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
                price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],

    addresses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
        paymentMethod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentMethod",
        required: true
    },
    shippingCost: {
        type: Number,
        required: true,
        min: 0
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    }, 
    paymentStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending"
    }

}, {timestamps: true}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;