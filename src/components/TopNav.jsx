import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import logo from '../assets/Minoki logo no background.png'

export default function TopNav() {
  const location = useLocation()
  const isShopPage = location.pathname === '/shop'
  const { cart } = useCart()
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

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
        padding: '0 40px',
        zIndex: 20,
      }}
    >
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
