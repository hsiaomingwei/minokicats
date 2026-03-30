import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from './context/CartContext.jsx'
import logo from './assets/Minoki logo no background.png'

import hero from './assets/loewe-reference.png'
import cat1 from './assets/bengal-cat.avif'
import cat2 from './assets/bengal-cat-walking.avif'
import cat3 from './assets/bengal-cat-on-wheel.avif'

const sections = [
  {
    image: hero,
    title: 'Minoki Cats',
    text: 'Quiet luxury for modern cats.',
    fit: 'contain',
    showLogo: true,
  },
  {
    image: cat1,
    title: 'Bengal',
    text: 'Elegant patterns and sculptural presence.',
    fit: 'cover',
  },
  {
    image: cat2,
    title: 'Movement',
    text: 'Minoki Cats is designed for those who appreciate a quieter, more independent way of living shared with their cats.',
    fit: 'cover',
  },
  {
    image: cat3,
    title: 'Play',
    text: 'Curiosity, interaction, and joy.',
    fit: 'cover',
  },
]

function Home() {
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
  }, [])

  return (
    <div style={{ background: '#000', scrollBehavior: 'smooth' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '0 40px',
          zIndex: 20,
        }}
      >
        <Link
          to="/shop"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '12px',
            letterSpacing: '1px',
          }}
        >
          Shop
        </Link>

        <Link
          to="/account"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '12px',
            letterSpacing: '1px',
          }}
        >
          {user ? 'My Account' : 'Account'}
        </Link>

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

      {sections.map((section, index) => (
        <section
          key={section.title}
          style={{
            position: index === 1 ? 'sticky' : 'relative',
            top: index === 1 ? 0 : 'auto',
            width: '100%',
            height: index === 1 ? '120vh' : '100vh',
            overflow: 'hidden',
            zIndex: index >= 2 ? 2 : index === 1 ? 1 : 0,
            background: '#000',
          }}
        >
          <img
            src={section.image}
            alt={section.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: section.fit,
              display: 'block',
            }}
          />

          {section.showLogo && (
            <Link to="/">
              <img
                src={logo}
                alt="Minoki"
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '40px',
                  height: '140px',
                  zIndex: 3,
                  cursor: 'pointer',
                }}
              />
            </Link>
          )}

          <div
            style={{
              position: 'absolute',
              left: '40px',
              bottom: '40px',
              color: '#fff',
              maxWidth: '420px',
              zIndex: 2,
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: '400', margin: 0 }}>
              {section.title}
            </h2>
            <p style={{ marginTop: '18px', lineHeight: '1.6', fontSize: '13px', letterSpacing: '0.5px', opacity: 0.85 }}>
              {section.text}
            </p>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Home
