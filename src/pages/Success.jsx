import { Link } from 'react-router-dom'
import logo from '../assets/Minoki logo no background.png'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function Success() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])
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
      <Link
        to="/"
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
        }}
      >
        <img
          src={logo}
          alt="Minoki"
          style={{
            height: '72px',
            objectFit: 'contain',
            display: 'block',
            cursor: 'pointer',
          }}
        />
      </Link>
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '80px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 400 }}>
          Payment successful
        </h1>

        <p style={{ marginTop: '16px', opacity: 0.7 }}>
          Thank you for your order.
        </p>
      </div>
    </div>
  )
}
