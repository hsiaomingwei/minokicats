import Checkout from './pages/Checkout.jsx'
import Cart from './pages/Cart.jsx'
import Category from './pages/Category.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import Success from './pages/Success.jsx'
import Cancel from './pages/Cancel.jsx'
import Account from './pages/Account.jsx'
import OrderDetail from './pages/OrderDetail.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/shop/:category" element={<Category />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/account" element={<Navigate to="/account/profile" replace />} />
      <Route path="/account/:section" element={<Account />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
    </Routes>
  )
}
