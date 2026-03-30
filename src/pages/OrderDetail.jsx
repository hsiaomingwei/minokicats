import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3005/api/orders')
      .then(res => res.json())
      .then(data => {
        const found = data.find(o => o.id === id)
        setOrder(found)
      })
  }, [id])

  if (!order) {
    return (
      <div style={{ padding: '40px', background: '#000', color: '#fff' }}>
        Loading...
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        padding: '40px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '12px',
          opacity: 0.7,
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      <div style={{ maxWidth: '600px', margin: '40px auto 0' }}>
        <h1 style={{ fontWeight: 400 }}>Order Detail</h1>

        <div style={{ marginTop: '20px', opacity: 0.7 }}>
          {new Date(order.createdAt).toLocaleString()}
        </div>

        <div style={{ marginTop: '8px' }}>
          Order #{order.id}
        </div>

        <div style={{ marginTop: '8px' }}>
          Status: {order.orderStatus}
        </div>

        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          Total — ${(order.amountTotal / 100).toFixed(2)}
        </div>

        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
          <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '10px' }}>
            ITEMS
          </div>

          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '14px',
              }}
            >
              <span>{item.name} × {item.qty}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
