import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart }) => {
    // Calculate discounted price if it's an offer
    if (!product) return null;
    const finalPrice = product.isOffer
        ? Math.round(product.price - (product.price * (product.discountPercentage / 100)))
        : product.price;

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
            {/* Image Section */}
            <div className="relative h-64 bg-gray-100 overflow-hidden group">
                <img
                    src={product.image || "https://via.placeholder.com/400x400?text=No+Image"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Discount Badge */}
                {product.isOffer && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        -{product.discountPercentage}% OFF
                    </span>
                )}

                {/* Category Badge */}
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow-sm">
                    {product.category}
                </span>
            </div>

            {/* Details Section */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 truncate">{product.title}</h3>

                <div className="mt-4 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">Price</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-indigo-600">LKR {finalPrice}</span>
                            {product.isOffer && (
                                <span className="text-sm text-gray-400 line-through decoration-red-500">
                                    LKR {product.price}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => onAddToCart && onAddToCart(product)}
                        className="bg-gray-900 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors shadow-lg"
                        title="Add to Cart"
                    >
                        <FaCartPlus size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;