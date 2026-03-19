import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Cash on Delivery"]
    },
    cardNumber: {
        type: String,
        max:16,
        required: true
    },
    cartHolderName: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    paypalEmail: {
        type: String,
    },
    bankName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    cvv: {
        type: String,       
    }
}, 
{timestamps: true}
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;

