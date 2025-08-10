import express from "express"
import { login, payment, register, userCredits, verifyRazorPay } from "../controllers/user.controller.js";
import Auth from "../middlewares/auth.js";

const router = express.Router();

router.post('/signup', register)
router.post('/login', login)
router.get('/credits',Auth, userCredits)
router.post('/payment',Auth, payment)
router.post('/verifypayment', verifyRazorPay)

export default router