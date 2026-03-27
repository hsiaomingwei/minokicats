import logo from './assets/logonobackground.png'
import hero from './assets/russian-blue.avif'
import cat2 from './assets/bengal-cat.avif'
import cat3 from './assets/bengal-cat-walking.avif'
import cat4 from './assets/bengal-cat-on-wheel.avif'

const sections = [
  {
    image: hero,
    title: 'Russian Blue',
    text: 'A calm, luminous introduction to the Minoki Cats world.',
  },
  {
    image: cat2,
    title: 'Bengal Collection',
    text: 'Elegant patterns and a sculptural presence inspired by feline beauty.',
  },
  {
    image: cat3,
    title: 'Movement',
    text: 'A more dynamic editorial moment with motion and attitude.',
  },
  {
    image: cat4,
    title: 'Play',
    text: 'A playful closing image to extend the story as the page unfolds.',
  },
]

export default function App() {
  return (
    <div style={{ background: '#fff' }}>
      {sections.map((section, index) => (
        <section
          key={section.title}
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <img
            src={section.image}
            alt={section.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {index === 0 && (
            <img
              src={logo}
              alt="Minoki"
              style={{
                position: 'absolute',
                top: '40px',
                left: '40px',
                height: '140px',
              }}
            />
          )}

          <div
            style={{
              position: 'absolute',
              left: '40px',
              bottom: '40px',
              color: '#fff',
              maxWidth: '420px',
            }}
          >
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '400',
                margin: 0,
              }}
            >
              {section.title}
            </h2>

            <p
              style={{
                marginTop: '14px',
                lineHeight: '1.6',
                fontSize: '16px',
              }}
            >
              {section.text}
            </p>
          </div>
        </section>
      ))}
    </div>
  )
}
