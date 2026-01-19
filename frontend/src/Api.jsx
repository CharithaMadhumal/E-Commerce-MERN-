import axios from "axios";


const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

// Auth APIs
export const loginUser = (formData) => API.post('/auth/login', formData);
export const registerUser = (formData) => API.post('/auth/register', formData);

// Product & Payment APIs (from previous step)
export const fetchProducts = (category) => API.get(`/products${category ? `?category=${category}` : ''}`);
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const processPayment = (orderData) => API.post('/payments/checkout', orderData);
export const updateProduct = (id, updatedProduct) => API.put(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);