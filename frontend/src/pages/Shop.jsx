import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../Api';
import ProductCard from '../components/ProductCard';

const Shop = ({ addToCart }) => { // Receiving the real function from App.js
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const { data } = await fetchProducts(category);
                setProducts(Array.isArray(data) ? data : data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [category]);

    const handleAddAndNavigate = (product) => {
        addToCart(product); // This adds the item to the state in App.js
        navigate('/cart');  // This sends the user to the cart page
    };

    /** * FIX: DELETED the local const addToCart function that was here.
     * This allows the component to use the 'addToCart' prop passed from App.js,
     * which actually handles the state and data storage.
     */

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            {category ? `${category}'s Collection` : 'All Products'}
                        </h1>
                        <p className="text-gray-500 mt-2">Discover the latest trends selected for you.</p>
                    </div>
                    <span className="mt-4 md:mt-0 bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full">
                        {products?.length || 0} Items Found
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products && products.length > 0 ? (
                            products.map((p) => (
                                <ProductCard
                                    key={p._id}
                                    product={p}
                                    onAddToCart={handleAddAndNavigate} // Now uses the correct prop function
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                No products found in this category.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;