import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import TopNav from '../components/TopNav.jsx'

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

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
        to="/shop"
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

      <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '60px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 400, margin: 0 }}>Cart</h1>

        {cart.length === 0 ? (
          <p style={{ marginTop: '24px', fontSize: '16px', opacity: 0.8 }}>
            Your cart is empty.
          </p>
        ) : (
          <>
            <div style={{ marginTop: '32px', display: 'grid', gap: '24px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr auto',
                    gap: '20px',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    paddingBottom: '24px',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />

                  <div>
                    <div style={{ fontSize: '20px' }}>{item.name}</div>
                    <div style={{ marginTop: '8px', fontSize: '16px', opacity: 0.85 }}>
                      ${item.price}
                    </div>

                    <div
                      style={{
                        marginTop: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          marginLeft: '12px',
                          background: 'transparent',
                          color: '#fff',
                          border: '1px solid rgba(255,255,255,0.3)',
                          padding: '6px 10px',
                          cursor: 'pointer',
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '18px' }}>${item.price * item.qty}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '20px' }}>Total</div>
              <div style={{ fontSize: '20px' }}>${total}</div>
            </div>

            <Link
              to="/checkout"
              style={{
                display: 'inline-block',
                marginTop: '24px',
                padding: '12px 24px',
                background: '#fff',
                color: '#000',
                textDecoration: 'none',
              }}
            >
              Checkout
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
