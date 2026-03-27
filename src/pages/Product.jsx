import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import TopNav from '../components/TopNav.jsx'
import productImg from '../assets/catnecklace.webp'

export default function Product() {
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        padding: '48px 40px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <TopNav />
      <Link
        to="/shop/necklaces"
        style={{
          position: 'fixed',
          top: '40px',
          left: '40px',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '12px',
          letterSpacing: '1px',
          zIndex: 20,
        }}
      >
        Back
      </Link>

      <div
        style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <img
          src={productImg}
          alt="Green One"
          style={{ width: '100%', objectFit: 'cover' }}
        />

        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 400, margin: 0 }}>
            Green One
          </h1>

          <p style={{ marginTop: '12px', fontSize: '18px' }}>$48</p>

          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <button
            onClick={() =>
              addToCart({ id: 1, name: 'Green One', price: 48, image: productImg, qty })
            }
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: '#fff',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
