import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        default: 5
    },
    images: [
        {
            type: String
        }
    ]
}, { timestamps: true })

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
