import Checkout from './pages/Checkout.jsx'
import Cart from './pages/Cart.jsx'
import Category from './pages/Category.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/shop/:category" element={<Category />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  )
}
