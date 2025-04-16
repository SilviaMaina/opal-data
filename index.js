import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectionDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express ();


app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cors( {
    origin: 'http://localhost:5173',
  credentials: true,
}));


app.use(cookieParser());



const PORT = process.env.PORT;
connectionDB()



app .get('/', (req, res) => res.send("API working!")) 
app.use('/api/user', authRouter)
app.use('/api/prof', userRouter)
app.use('/api/posts', postRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})