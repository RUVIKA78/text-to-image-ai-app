import jwt from 'jsonwebtoken'

const Auth = async (req, res,next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(400).json({success:false, message:"no authorized user found"})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_KEY);
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        }
        else {
            return res.status(400).json({success:false, message:"no auth user found"})
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
        
    }
}

export default Auth