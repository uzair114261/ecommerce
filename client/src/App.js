import React from 'react'
import './App.css';
import Products from './Components/Products/Products';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import ProductDetail from './Components/ProductDetail';
import ShopingCart from './Components/ShopingCart';
import UserRegistration from './Components/UserRegistration';
import { ToastProvider } from './Components/Context/ToastContext';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import { MultiStepProvider } from './Components/Context/Multistep';
function App() {


  return (
    <div className="App bg-slate-200 dark:bg-gray-700">
      <ToastProvider>
        <MultiStepProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/product' element={<Products />} />
              <Route path='/product-details/:slug' element={<ProductDetail />} />
              <Route path='/cart' element={<ShopingCart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/account' element={<UserRegistration />} />
            </Routes>
            <Footer />
          </Router>
        </MultiStepProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
