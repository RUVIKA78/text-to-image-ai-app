import { generateImage, getImagesByUserId } from "../controllers/image.controller.js";
import express from "express";
import Auth from "../middlewares/auth.js";

const router = express.Router();

router.post('/generateimage',Auth, generateImage);
router.get('/get-images',Auth, getImagesByUserId);


export default router