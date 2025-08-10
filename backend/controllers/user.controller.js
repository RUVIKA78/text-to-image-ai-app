import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";
import Razorpay from "razorpay";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "all fields are required!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await User.create({
            username, email, password: hashedPassword
        })
        // console.log(createUser);

        const token = jwt.sign({ id: createUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });

        // console.log(token);
        return res.status(200).json({ success: true, createUser, token, message: "user registered" })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "user not found" })

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            return res.status(400).json({ message: "password incorrect" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' })

        return res.status(200).json({ success: true, message: "login successful", token, user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })


    }
}

export const userCredits = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        return res.json({ success: true, credits: user.credits, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error })

    }
}

const razorpayInstance = new Razorpay({
    // key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
    key_id: "rzp_test_MMqhbQsbyYWx8T",
    // key_secret: "K8pkHEAO0ToVmCJmai3QxRzI",
})

export const payment = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const userdata = await User.findById(userId);
        if (!userId || !planId) {
            return res.status(400).json({ success: false, message: "missing details" })
        }
        let credits, plan, amount, date;

        switch (planId) {
            case 'Basic':
                plan = 'Basic',
                    credits = 5,
                    amount = 10
                break;
            case 'Advance':
                plan = 'Advance',
                    credits = 30,
                    amount = 50
                break;
            case 'Premium':
                plan = 'Premium',
                    credits = 300,
                    amount = 250
                break;

            default:
                return res.status(200).json({ success: false, message: "plan not found" })
        }

        date = Date.now();
        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await Payment.create(transactionData);
        const options = {
            // key:process.env.RAZOR_PAY_KEY_ID,
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        }
        // console.log("Creating order with:", options);
        // console.log("Using Razorpay keys:", process.env.RAZOR_PAY_KEY_ID, process.env.RAZOR_PAY_SECRET);

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);

                return res.status(500).json({ success: false, error })
            }
            res.json({ success: true, order })
        })


    } catch (error) {
        console.log(error);
        res.json({ success: false })

    }
}

export const verifyRazorPay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            const transactionData = await Payment.findById(orderInfo.receipt);

            if (transactionData.payment) {
                return res.json({ success: false, message: "payment failed" })
            }
            const userdata = await User.findById(transactionData.userId);

            const credits = userdata.credits + transactionData.credits;

            await User.findByIdAndUpdate(userdata._id, { credits })

            await Payment.findByIdAndUpdate(transactionData._id, { payment: true })

            return res.json({ success: true, message: "credits added" });

        }

        else {
            return res.json({ success: false, message: "payment failed" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error })

    }
}

