import logo from './assets/Minoki.png'

export default function App() {
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', background: '#fff' }}>
      
      {/* NAVBAR */}
      <header style={{
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        zIndex: 10
      }}>
        <div style={{ fontSize: '14px' }}>MENU</div>

        <img src={logo} alt="Minoki" style={{ height: '40px' }} />

        <div style={{ fontSize: '14px' }}>CART</div>
      </header>

      {/* HERO IMAGE */}
      <section style={{
        height: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1543852786-1cf6624b9987)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '60px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          color: '#fff'
        }}>
          Minoki Cats
        </h1>
      </section>

    </div>
  )
}