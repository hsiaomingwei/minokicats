import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useEffect, useState } from 'react'
import logo from '../assets/Minoki logo no background.png'

export default function TopNav() {
  const location = useLocation()
  const isShopPage = location.pathname === '/shop'
  const { cart } = useCart()
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('minokiUser')
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      setUser(null)
    }
  }, [location.pathname])

  return (
    <>
      {!isShopPage && (
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
      )}

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '0 40px',
          zIndex: 20,
        }}
      >
        {user ? (
          <span style={{ color: '#fff', fontSize: '12px', letterSpacing: '1px' }}>
            {user.email}
          </span>
        ) : (
          <Link
            to="/account"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '12px',
              letterSpacing: '1px',
            }}
          >
            Account
          </Link>
        )}

        <Link
          to="/cart"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '12px',
            letterSpacing: '1px',
          }}
        >
          Cart{count > 0 ? ` (${count})` : ''}
        </Link>
      </div>
    </>
  )
}
