import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import TopNav from '../components/TopNav.jsx'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (placed) {
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
          to="/cart"
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

        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '120px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 400, margin: 0 }}>
            Order placed
          </h1>
          <p style={{ marginTop: '18px', fontSize: '15px', lineHeight: '1.7', opacity: 0.85 }}>
            Thank you for shopping with Minoki Cats.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              marginTop: '28px',
              padding: '12px 24px',
              background: '#fff',
              color: '#000',
              textDecoration: 'none',
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

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
        to="/cart"
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
          maxWidth: '1100px',
          margin: '0 auto',
          paddingTop: '80px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '56px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 400, margin: 0 }}>Checkout</h1>

          <div style={{ marginTop: '32px', display: 'grid', gap: '18px' }}>
            <input
              placeholder="Full name"
              style={{
                padding: '14px 16px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.22)',
                outline: 'none',
              }}
            />
            <input
              placeholder="Email"
              style={{
                padding: '14px 16px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.22)',
                outline: 'none',
              }}
            />
            <input
              placeholder="Address"
              style={{
                padding: '14px 16px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.22)',
                outline: 'none',
              }}
            />
            <input
              placeholder="City"
              style={{
                padding: '14px 16px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.22)',
                outline: 'none',
              }}
            />
            <input
              placeholder="ZIP code"
              style={{
                padding: '14px 16px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.22)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 400, margin: 0 }}>Order summary</h2>

          <div style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '16px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px' }}>{item.name}</div>
                  <div style={{ marginTop: '6px', fontSize: '14px', opacity: 0.75 }}>
                    Qty {item.qty}
                  </div>
                </div>
                <div style={{ fontSize: '16px' }}>${item.price * item.qty}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '20px',
            }}
          >
            <div>Total</div>
            <div>${total}</div>
          </div>

          <button
            onClick={async () => {
              try {
                const res = await fetch('http://localhost:3005/api/create-checkout-session', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ items: cart }),
                })

                const data = await res.json()

                if (data.url) {
                  window.location.href = data.url
                } else {
                  alert('Failed to start checkout')
                }
              } catch (err) {
                console.error(err)
                alert('Error connecting to payment')
              }
            }}
            style={{
              marginTop: '28px',
              width: '100%',
              padding: '14px 24px',
              background: '#fff',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}
