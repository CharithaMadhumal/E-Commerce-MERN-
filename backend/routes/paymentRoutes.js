import express from 'express';
import { checkout, createOrder } from '../controllers/paymentController.js';


const paymentRouter = express.Router();

paymentRouter.post('/createOrder', createOrder);
paymentRouter.post('/checkout',checkout);

export default paymentRouter;
