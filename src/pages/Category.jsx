import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import TopNav from '../components/TopNav.jsx'
import productImg from '../assets/catnecklace.webp'

const categoryMap = {
  necklaces: {
    title: 'Necklaces',
    products: [
      {
        id: 1,
        name: 'Green One',
        price: 48,
        image: productImg,
      },
    ],
  },
  bowls: {
    title: 'Bowls',
    products: [],
  },
  grooming: {
    title: 'Grooming',
    products: [],
  },
}

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  return (
    <div style={{ color: '#fff' }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          aspectRatio: '4 / 5',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      <div style={{ marginTop: '14px', fontSize: '18px' }}>{product.name}</div>
      <div style={{ marginTop: '6px', fontSize: '15px', opacity: 0.8 }}>
        ${product.price}
      </div>

      <div
        style={{
          marginTop: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          style={{
            width: '32px',
            height: '32px',
            background: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
          }}
        >
          -
        </button>

        <span style={{ minWidth: '20px', textAlign: 'center' }}>{qty}</span>

        <button
          onClick={() => setQty(qty + 1)}
          style={{
            width: '32px',
            height: '32px',
            background: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty,
          })
        }
        style={{
          marginTop: '16px',
          padding: '12px 20px',
          background: '#fff',
          color: '#000',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add to Cart
      </button>

      <Link
        to="/product/1"
        style={{
          display: 'inline-block',
          marginTop: '12px',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '12px',
          letterSpacing: '1px',
          opacity: 0.8,
        }}
      >
        View Product
      </Link>
    </div>
  )
}

export default function Category() {
  const { category } = useParams()
  const data = categoryMap[category]

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

      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '60px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 400, margin: 0 }}>
          {data?.title || 'Category'}
        </h1>

        {data?.products?.length ? (
          <div
            style={{
              marginTop: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '28px',
            }}
          >
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ marginTop: '24px', opacity: 0.75 }}>Coming soon.</p>
        )}
      </div>
    </div>
  )
}
