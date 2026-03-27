import { Link } from 'react-router-dom';
import logo from '../assets/Minoki logo no background.png'
import TopNav from '../components/TopNav.jsx'

export default function Shop() {
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
      <Link to="/" style={{ position: 'fixed', top: '40px', left: '40px', color: '#fff', textDecoration: 'none', fontSize: '12px', letterSpacing: '1px', zIndex: 20 }}>Back</Link>
      <TopNav />

      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Minoki"
            style={{
              height: '96px',
              marginBottom: '12px',
              cursor: 'pointer',
            }}
          />
        </Link>

        <div
          style={{
            marginTop: '2px',
            display: 'grid',
            gap: '14px',
            justifyItems: 'center',
          }}
        >
          <Link
            to="/shop/necklaces"
            style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}
          >
            Necklaces
          </Link>
          <Link
            to="/shop/bowls"
            style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}
          >
            Bowls
          </Link>
          <Link
            to="/shop/grooming"
            style={{ color: '#fff', textDecoration: 'none', fontSize: '18px' }}
          >
            Grooming
          </Link>
        </div>
      </div>
    </div>
  )
}
