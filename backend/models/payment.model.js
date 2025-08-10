import mongoose from "mongoose";

const payment = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true

    },
    amount: {
        type: Number,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
    date:{ type:Number}
}, { timestamps: true })

const Payment = mongoose.models.payment || mongoose.model("Payment", payment);

export default Payment;
