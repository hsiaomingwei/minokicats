import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
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
    text: 'A new way for cats to live at home.',
    fit: 'contain',
    showLogo: true,
  },
  {
    image: cat1,
    title: 'Bengal',
    text: 'Designed for a calm, natural life indoors.',
    fit: 'cover',
  },
  {
    image: cat2,
    title: 'Movement',
    text: 'Built around how cats move and live.',
    fit: 'cover',
  },
  {
    image: cat3,
    title: 'Play',
    text: 'A complete living system for modern cats.',
    fit: 'cover',
  },
]

function Home() {
  const { cart } = useCart()
  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const [user, setUser] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const stored = localStorage.getItem('minokiUser')
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const candidates = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aIndex = Number(a.target.dataset.index)
            const bIndex = Number(b.target.dataset.index)
            const ratioDiff = b.intersectionRatio - a.intersectionRatio

            if (Math.abs(ratioDiff) > 0.02) return ratioDiff
            return bIndex - aIndex
          })

        if (candidates.length > 0) {
          const nextIndex = Number(candidates[0].target.dataset.index)
          setActiveIndex(nextIndex)
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      }
    )

    const currentSections = sectionRefs.current
    currentSections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      currentSections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
      observer.disconnect()
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

      <Link to="/">
        <img
          src={logo}
          alt="Minoki"
          style={{
            position: 'fixed',
            top: '40px',
            left: '40px',
            height: '140px',
            zIndex: 30,
            cursor: 'pointer',
          }}
        />
      </Link>

      <div
        style={{
          position: 'fixed',
          left: '40px',
          bottom: '40px',
          color: '#fff',
          maxWidth: '420px',
          zIndex: 31,
        }}
      >
        <p
          style={{
            marginTop: '18px',
            lineHeight: '1.6',
            fontSize: '13px',
            letterSpacing: '0.5px',
            opacity: 0.85,
          }}
        >
          {sections[activeIndex].text}
        </p>
      </div>

      {sections.map((section, index) => (
        <section
          key={section.title}
          ref={(el) => {
            sectionRefs.current[index] = el
          }}
          data-index={index}
          style={{
            position: 'sticky',
            top: 0,
            width: '100%',
            height: '120vh',
            overflow: 'hidden',
            zIndex: index,
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

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '35%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        </section>
      ))}
    </div>
  )
}

export default Home
