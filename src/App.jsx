
import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Layout from './pages/Layout'
import Produxtspage from './pages/Produxtspage'
import Singleproduct from './components/Productsdetails/Singleproduct'
import CartPage from './pages/Cartpage'
import Whislistpage from './pages/Whislistpage'
import Loginpage from './pages/Loginpage'
import LogoutButton from './ui/Logoutbutton'
import Productdesc from './components/Productsdetails/Productsdesc'
import Productdetails from './pages/Productdetails'

function App() {
  return (
    <>
      <div className=' '>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="products" element={<Produxtspage />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="products/category/:slug" element={<Produxtspage />} />
            <Route path="/products/item/:id" element={<Singleproduct />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/wishlist" element={<Whislistpage />} />
            <Route path="/product/:id" element={<Productdetails />} />

          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
