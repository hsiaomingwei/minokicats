import { Link } from 'react-router-dom'
import logo from '../assets/Minoki logo no background.png'

export default function Cancel() {
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

      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '80px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 400 }}>
          Payment canceled
        </h1>

        <p style={{ marginTop: '16px', opacity: 0.7 }}>
          Your cart is still saved. You can return to checkout anytime.
        </p>

        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link
            to="/cart"
            style={{
              padding: '12px 20px',
              background: '#fff',
              color: '#000',
              textDecoration: 'none',
            }}
          >
            Back to Cart
          </Link>

          <Link
            to="/shop"
            style={{
              padding: '12px 20px',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
