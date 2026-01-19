import React, { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../Api";

const Admin = () => {

    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [form, setForm] = useState({
        title: '',
        price: '',
        category: 'Ladies',
        image: '',
        isOffer: false,
        discountPercentage: 0
    });

    // Load products on component mount
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products", error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    }

    // Submit (Add or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing) {
                await updateProduct(currentId, form);
                // alert('Product Updated Successfully');
            } else {
                await createProduct(form);
                // alert('Product Created Successfully');
            }
            setForm({ title: '', price: '', category: 'Ladies', image: '', isOffer: false, discountPercentage: 0 });
            setIsEditing(false);
            loadProducts();
        } catch (error) {
            console.error(error);
            alert('Operation Failed');
        } finally {
            setLoading(false);
        }
    };

    // Delete Product
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                loadProducts();
            } catch (error) {
                console.error("Failed to delete", error);
            }
        }
    };

    // Populate Form for Editing
    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentId(product._id);
        setForm({
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.image,
            isOffer: product.isOffer || false,
            discountPercentage: product.discountPercentage || 0
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                            Admin <span className="text-indigo-600">Dashboard</span>
                        </h1>
                        <p className="mt-2 text-lg text-slate-600">
                            Manage your inventory and product listings with ease.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                            <span className="text-sm text-slate-500">Total Products</span>
                            <div className="text-2xl font-bold text-slate-800">{products.length}</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Side: Form */}
                    <div className="xl:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden sticky top-8">
                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white border-b border-indigo-50">
                                <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                                    {isEditing ? (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                            Edit Product
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                            Add New Product
                                        </>
                                    )}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Product Title</label>
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none placeholder-slate-400"
                                        placeholder="e.g. Summer Floral Dress"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Price (LKR)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-2.5 text-slate-400">Rs.</span>
                                            <input
                                                name="price"
                                                type="number"
                                                value={form.price}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                                        <div className="relative">
                                            <select
                                                name="category"
                                                value={form.category}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none appearance-none bg-white"
                                            >
                                                <option value="Ladies">Ladies</option>
                                                <option value="Gents">Gents</option>
                                                <option value="Unisex">Unisex</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
                                    <input
                                        name="image"
                                        value={form.image}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none placeholder-slate-400"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {form.image && (
                                        <div className="mt-3 relative h-32 w-full rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                {/* Offer Section */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                                    <div className="flex items-center gap-3 mb-3">
                                        <input
                                            id="isOffer"
                                            type="checkbox"
                                            name="isOffer"
                                            checked={form.isOffer}
                                            onChange={handleChange}
                                            className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 transition"
                                        />
                                        <label htmlFor="isOffer" className="text-sm font-medium text-slate-700 cursor-pointer select-none">Mark as Special Offer</label>
                                    </div>

                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${form.isOffer ? 'max-h-20 opacity-100' : 'max-h-0 opacity-50'}`}>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Discount Percentage</label>
                                        <div className="relative">
                                            <input
                                                name="discountPercentage"
                                                type="number"
                                                value={form.discountPercentage}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                                min="0"
                                                max="100"
                                            />
                                            <span className="absolute right-4 top-2 text-slate-400 font-bold">%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 flex flex-col gap-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-indigo-500/20 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed
                                            ${isEditing
                                                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                                                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700'
                                            }`}
                                    >
                                        {loading ? 'Processing...' : (isEditing ? 'Update Product' : 'Add Product')}
                                    </button>

                                    {isEditing && (
                                        <button
                                            onClick={() => { setIsEditing(false); setForm({ title: '', price: '', category: 'Ladies', image: '', isOffer: false, discountPercentage: 0 }); }}
                                            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                                        >
                                            Cancel Editing
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Product List */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                                <h2 className="text-xl font-bold text-slate-800">Inventory</h2>
                                <div className="text-sm text-slate-500 italic">Showing all items</div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                            <th className="p-5">Product</th>
                                            <th className="p-5">Category</th>
                                            <th className="p-5">Price</th>
                                            <th className="p-5">Status</th>
                                            <th className="p-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center text-slate-500">
                                                    No products found. Start by adding one!
                                                </td>
                                            </tr>
                                        ) : products.map((p) => (
                                            <tr key={p._id} className="group hover:bg-slate-50/80 transition-colors duration-150">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                                                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="font-semibold text-slate-900 line-clamp-1 max-w-[150px]">{p.title}</div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                                                        ${p.category === 'Ladies' ? 'bg-pink-50 text-pink-700 border-pink-100' :
                                                            p.category === 'Gents' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                                'bg-purple-50 text-purple-700 border-purple-100'}`}>
                                                        {p.category}
                                                    </span>
                                                </td>
                                                <td className="p-5 font-medium text-slate-700">
                                                    LKR {p.price}
                                                </td>
                                                <td className="p-5">
                                                    {p.isOffer ? (
                                                        <div className="flex flex-col items-start gap-1">
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                                Active Offer
                                                            </span>
                                                            <span className="text-xs font-bold text-green-600">-{p.discountPercentage}%</span>
                                                        </div>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                                            Regular
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex items-center justify-end gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEdit(p)}
                                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors tooltip"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(p._id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;