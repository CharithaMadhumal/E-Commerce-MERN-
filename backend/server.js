import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';


const app = express();

// Database Connection

 connectDB();

// Middleware

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json("API is running")
})

// Routes Setup

app.use('/api/auth',userRouter);
app.use('/api/products',productRouter);
app.use('/api/payments', paymentRouter);




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
   console.log( `Server is running on Port ${PORT}`)
}) ;

