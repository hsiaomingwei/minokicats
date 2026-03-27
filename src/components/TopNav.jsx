import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function TopNav() {
  const { cart } = useCart()
  const count = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
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
  )
}
