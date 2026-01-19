import React, { useState } from "react";
import { processPayment } from "../Api";
import { FaCheckCircle, FaCreditCard, FaLock } from "react-icons/fa";

const Checkout = () => {

    const [method, setMethod] = useState('card');
    const [loading, setLoading] = useState(false);

    const cartTotal = 4500;

    const handlePayment = async () => {
        setLoading(true);

        const orderData = {
            userId: "user_123",
            products: [{ productId: "prod_001", quantity: 1 }],
            totalAmount: cartTotal,
            paymentMethod: method
        };

        try {
            const { data } = await processPayment(orderData);

            setTimeout(() => {
                alert(`Redirecting to ${method.toUpperCase()} secure gateway... \nOrder ID: ${data.paymentDetails.orderId}`);
                setLoading(false);
            }, 1500);

        } catch (error) {
            alert("Payment initiation failed. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
                    <div className="space-y-3 border-b pb-4 mb-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>LKR {cartTotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>LKR 350</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>LKR {cartTotal + 350}</span>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Select Payment Method</h2>

                    <div className="space-y-4">
                        {/* Koko Pay */}
                        <div
                            onClick={() => setMethod('koko')}
                            className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${method === 'koko' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded">KOKO</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Koko Pay Later</h3>
                                    <p className="text-xs text-gray-500">Pay in 3 installments</p>
                                </div>
                            </div>
                            {method === 'koko' && <FaCheckCircle className="text-indigo-600" />}
                        </div>

                        {/* InitPay */}
                        <div
                            onClick={() => setMethod('initpay')}
                            className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${method === 'initpay' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">InitPay</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">InitPay Wallet</h3>
                                    <p className="text-xs text-gray-500">Secure digital payment</p>
                                </div>
                            </div>
                            {method === 'initpay' && <FaCheckCircle className="text-indigo-600" />}
                        </div>

                        {/* Card */}
                        <div
                            onClick={() => setMethod('card')}
                            className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${method === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}
                        >
                            <div className="flex items-center gap-3">
                                <FaCreditCard className="text-gray-600 text-xl" />
                                <div>
                                    <h3 className="font-bold text-gray-900">Credit / Debit Card</h3>
                                    <p className="text-xs text-gray-500">Visa, Master, Amex</p>
                                </div>
                            </div>
                            {method === 'card' && <FaCheckCircle className="text-indigo-600" />}
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full mt-8 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                    >
                        {loading ? 'Processing...' : (
                            <>
                                <FaLock size={16} /> Pay Securely
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Checkout;
