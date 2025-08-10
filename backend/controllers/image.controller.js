import axios from "axios";
import User from "../models/user.model.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        const user = await User.findById(userId);

        if (!user || !prompt) {
            return res.status(400).json({ success: false, message: "fill all details" });
        }

        if (user.credits === 0 || user.credits < 0) {
            return res.status(500).json({ success: false, message: "0 credits left", credits: user.credits })
        }

        const formData = new FormData();
        formData.append('prompt', prompt);
        
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            
            headers: {
                
                'x-api-key': process.env.IMG_API_KEY,
            },
            responseType: 'arraybuffer'

        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');

        const resultImage = `data:image/png;base64,${base64Image}`

       
        await User.findByIdAndUpdate(user._id, { credits: user.credits - 1,  $push: { images: resultImage }})
        return res.status(200).json({ success: true, message: "image generated", credits: user.credits - 1, resultImage })



    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })

    }
}

export const getImagesByUserId = async (req, res) => {
    try {
        const { userId } = req.body;

        const user =await User.findById(userId);
        if (!user) {
            return res.status(404).json({success:false, message:"no user found"})
        }
        // console.log(user.images)
        return res.status(200).json({success:true, images:user.images})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error.message})
    }
}