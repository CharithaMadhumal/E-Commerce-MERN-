import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import { useState } from 'react';

function App() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {

    const discountedPrice = product.isOffer
      ? Math.round(product.price - (product.price * (product.discountPercentage / 100)))
      : product.price;

    const exist = cart.find((x) => x._id === product._id);

    if (exist) {
      setCart(cart.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x));
      alert("Item quantity updated in Cart!");
    } else {
      setCart([...cart, { ...product, price: discountedPrice, qty: 1 }]);
      alert(`${product.title} added to Cart at LKR ${discountedPrice}!`);
    }
  };

  return (
    <Router>
      <div className='min-h-screen bg-gray-100 font-sans'>
        <Navbar cartCount={cart.length} />

        <Routes>
          <Route path='/' element={<Home />} />

          {/* FIX: Removed duplicate /shop and / routes. 
               Only this ONE Shop route should remain to pass the props correctly. */}
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />

          <Route path="/cart" element={<Cart cartItems={cart} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/productCard' element={<ProductCard />} />
          <Route path='/admin' element={<Admin />} />
          {/* Passing cart and total to checkout might be useful later */}
          <Route path='/checkout' element={<Checkout cartItems={cart} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;