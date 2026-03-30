import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from '../assets/Minoki logo no background.png'

export default function Account() {
  const { section } = useParams()
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('register')
  const [profileName, setProfileName] = useState('')
  const [profileAddress, setProfileAddress] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('minokiUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
      setProfileName(parsed.name || '')
      setProfileAddress(parsed.address || '')
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('minokiUser')
    setUser(null)
    setMessage('Logged out')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const endpoint =
        mode === 'register'
          ? 'http://localhost:3005/api/register'
          : 'http://localhost:3005/api/login'

      const payload =
        mode === 'register'
          ? { name, email, password }
          : { email, password }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || `${mode === 'register' ? 'Registration' : 'Login'} failed`)
        return
      }

      localStorage.setItem('minokiUser', JSON.stringify(data.user))
      setUser(data.user)
      setProfileName(data.user.name || '')
      setProfileAddress(data.user.address || '')
      setMessage(mode === 'register' ? 'Account created successfully' : 'Logged in successfully')

      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      setMessage('Server connection failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleProfileSave(e) {
    e.preventDefault()

    if (!user) return

    setSavingProfile(true)
    setMessage('')

    try {
      const res = await fetch(`http://localhost:3005/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileName,
          address: profileAddress,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Failed to save profile')
        return
      }

      localStorage.setItem('minokiUser', JSON.stringify(data.user))
      setUser(data.user)
      setIsEditingProfile(false)
      setMessage('Profile updated')
    } catch (err) {
      setMessage('Failed to save profile')
    } finally {
      setSavingProfile(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
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
        <Link to="/shop" style={{ color: '#fff', fontSize: '12px', textDecoration: 'none' }}>
          Shop
        </Link>
        <Link to="/cart" style={{ color: '#fff', fontSize: '12px', textDecoration: 'none' }}>
          Cart
        </Link>
      </div>

      <Link
        to="/"
        style={{
          position: 'fixed',
          top: '40px',
          left: '40px',
          zIndex: 20,
        }}
      >
        <img src={logo} alt="Minoki" style={{ height: '72px' }} />
      </Link>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}
      >
        {!user ? (
          <div style={{ width: '100%', maxWidth: '520px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {['profile', 'orders', 'settings'].map((t) => (
                <Link
                  key={t}
                  to={`/account/${t}`}
                  style={{
                    flex: 1,
                    padding: '12px',
                    textAlign: 'center',
                    background: section === t ? '#fff' : 'transparent',
                    color: section === t ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    textDecoration: 'none',
                    fontSize: '12px',
                    letterSpacing: '1px',
                  }}
                >
                  {t.toUpperCase()}
                </Link>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <h1 style={{ fontWeight: 400, margin: 0 }}>Account</h1>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register')
                    setMessage('')
                  }}
                  style={{
                    flex: 1,
                    background: mode === 'register' ? '#fff' : 'transparent',
                    color: mode === 'register' ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    padding: '12px',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                  }}
                >
                  REGISTER
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    setMessage('')
                  }}
                  style={{
                    flex: 1,
                    background: mode === 'login' ? '#fff' : 'transparent',
                    color: mode === 'login' ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    padding: '12px',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                  }}
                >
                  LOGIN
                </button>
              </div>

              {mode === 'register' && (
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: '#fff',
                    padding: '14px',
                  }}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  padding: '14px',
                }}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  padding: '14px',
                }}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  padding: '14px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {loading ? '...' : mode === 'register' ? 'CREATE ACCOUNT' : 'LOGIN'}
              </button>

              {message && (
                <p style={{ fontSize: '12px', opacity: 0.85 }}>
                  {message}
                </p>
              )}
            </form>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '520px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {['profile', 'orders', 'settings'].map((t) => (
                <Link
                  key={t}
                  to={`/account/${t}`}
                  style={{
                    flex: 1,
                    padding: '12px',
                    textAlign: 'center',
                    background: section === t ? '#fff' : 'transparent',
                    color: section === t ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    textDecoration: 'none',
                    fontSize: '12px',
                    letterSpacing: '1px',
                  }}
                >
                  {t.toUpperCase()}
                </Link>
              ))}
            </div>

            {section === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h1 style={{ fontWeight: 400, margin: 0 }}>My Account</h1>

                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  Signed in as {user.email}
                </div>

                {!isEditingProfile ? (
                  <>
                    <div style={{ fontSize: '16px' }}>
                      {user.name || 'No name added'}
                    </div>

                    <div style={{ fontSize: '14px', opacity: 0.8, whiteSpace: 'pre-line' }}>
                      {user.address || 'No shipping address added'}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileName(user.name || '')
                        setProfileAddress(user.address || '')
                        setMessage('')
                        setIsEditingProfile(true)
                      }}
                      style={{
                        background: '#fff',
                        color: '#000',
                        padding: '12px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      EDIT PROFILE
                    </button>
                  </>
                ) : (
                  <form
                    onSubmit={handleProfileSave}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: '#fff',
                        padding: '14px',
                      }}
                    />

                    <textarea
                      placeholder="Shipping address"
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      rows={5}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: '#fff',
                        padding: '14px',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                      }}
                    />

                    <button
                      type="submit"
                      disabled={savingProfile}
                      style={{
                        background: '#fff',
                        color: '#000',
                        padding: '12px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {savingProfile ? 'SAVING...' : 'SAVE PROFILE'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileName(user.name || '')
                        setProfileAddress(user.address || '')
                        setMessage('')
                        setIsEditingProfile(false)
                      }}
                      style={{
                        background: 'transparent',
                        color: '#fff',
                        padding: '12px',
                        border: '1px solid rgba(255,255,255,0.25)',
                        cursor: 'pointer',
                      }}
                    >
                      CANCEL
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    padding: '12px',
                    border: '1px solid rgba(255,255,255,0.25)',
                    cursor: 'pointer',
                  }}
                >
                  LOGOUT
                </button>

                {message && <p style={{ fontSize: '12px', opacity: 0.85 }}>{message}</p>}
              </div>
            )}

            {section === 'orders' && <Orders user={user} />}

            {section === 'settings' && (
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontWeight: 400 }}>Settings</h1>
                <p style={{ opacity: 0.7 }}>Coming soon</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Orders({ user }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/api/orders')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((o) => o.customerEmail === user.email)
        setOrders(filtered.reverse())
      })
  }, [user.email])

  if (!orders.length) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontWeight: 400 }}>Orders</h1>
        <p style={{ opacity: 0.7 }}>No orders yet</p>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontWeight: 400, marginBottom: '24px' }}>Orders</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  padding: '4px 8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  opacity: 0.8,
                  letterSpacing: '1px',
                }}
              >
                {order.orderStatus.toUpperCase()}
              </div>
            </div>

            <div style={{ fontSize: '14px', letterSpacing: '0.5px' }}>Order #{order.id}</div>

            <div style={{ fontSize: '13px', opacity: 0.85 }}>
              Total — ${(order.amountTotal / 100).toFixed(2)}
            </div>

            {Array.isArray(order.items) && order.items.length > 0 && (
              <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '1px', opacity: 0.5, marginBottom: '6px' }}>
                  ITEMS
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {order.items.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ opacity: 0.9 }}>
                        {item.name} {item.qty ? `× ${item.qty}` : ''}
                      </span>

                      <span style={{ opacity: 0.6 }}>
                        {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
