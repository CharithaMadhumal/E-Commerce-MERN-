import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserShield } from 'react-icons/fa';


const Navbar = () => {

    return (

        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Luxe<span className="text-indigo-600">Store</span>
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
                    <Link to="/shop?category=Ladies" className="text-gray-600 hover:text-indigo-600">Ladies</Link>
                    <Link to="/shop?category=Gents" className="text-gray-600 hover:text-indigo-600">Genets</Link>
                    <Link to="/register" className="text-gray-600 hover:text-indigo-600">Login/Register</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/admin" className="text-gray-600 hover:text-red-500">
                        <FaUserShield size={20} />
                    </Link>
                    <Link to="/checkout" className="text-gray-600 hover:text-indigo-600 relative">
                        <FaShoppingCart size={20}/>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">2</span>

                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;