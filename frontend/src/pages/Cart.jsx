import React from 'react';

const Cart = ({ cartItems }) => {
  // Calculate Total Price
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-10">
          Your cart is empty.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b py-4">
              
              {/* Product Image & Title */}
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm">Category: {item.category}</p>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="text-right">
                <p className="font-bold text-indigo-600">LKR {item.price}</p>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <span className="text-2xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-indigo-600">LKR {total}</span>
          </div>

          <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;