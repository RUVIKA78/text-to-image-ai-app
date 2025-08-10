import { log } from "console";
import express from "express";
import { config } from "dotenv";
import cors from "cors"
import connectDB from "./connect.js";
import userRouter from "./routes/user.routes.js"
import imageRouter from './routes/image.routes.js'
import bodyParser from "body-parser";
config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter)
app.get('/', (req, res) => {
    res.send("api is working");
})

app.get('/',() => console.log("server has been started "))
app.listen(PORT,
    () =>
        console.log("server is running on PORT"))


export default app;