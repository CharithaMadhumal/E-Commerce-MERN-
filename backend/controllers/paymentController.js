import Order from "../models/Order.js";


export const createOrder = async (req, res) => {

    const { userId, products, totalAmount, paymentMethod } = req.body;

    const newOrder = new Order({
        userId,
        products,
        totalAmount,
        paymentMethod
    })



    try {

        const saveOrder = await newOrder.save();

        // 2. Simulate Payment Gateway Logic
        let gatewayResponse;

        if (paymentMethod === 'koko') {
            // Logic to redirect to Koko Pay Later API
            gatewayResponse = { url: "https://koko-gateway.com/pay", orderId: saveOrder._id };
        } else if (paymentMethod === 'initpay') {
            // Logic for InitPay API
            gatewayResponse = { url: "https://initpay.com/process", orderId: saveOrder._id };
        } else {
            // Logic for Stripe/Card
            gatewayResponse = { status: "Card Payment Processed", orderId: saveOrder._id };
        }

        res.status(200).json({
            message: "Order Created, proceed to payment",
            paymentDetails: gatewayResponse
        });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: message.error });
    }
}

// controllers/paymentController.js

export const checkout = async (req, res) => {
    try {
        const { userId, products, totalAmount, paymentMethod } = req.body;

        // 1. Validate Data
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No items in cart" });
        }

        // 2. Mock Payment Processing Logic
        // In a real app, you would call Stripe/InitPay API here.
        console.log(`Processing ${paymentMethod} payment for LKR ${totalAmount}`);

        // 3. Create a fake Order ID
        const fakeOrderId = `ORDER_${Math.floor(Math.random() * 1000000)}`;

        // 4. Send Success Response
        return res.status(200).json({
            success: true,
            message: "Payment Initiated Successfully",
            paymentDetails: {
                orderId: fakeOrderId,
                amount: totalAmount,
                status: "Pending", // or "Paid"
                method: paymentMethod,
                url: "/success" // Where to redirect user (optional)
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Payment Failed" });
    }
};