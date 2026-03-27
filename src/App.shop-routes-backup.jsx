import logo from './assets/Minoki logo no background.png'

import hero from './assets/loewe-reference.png'
import cat1 from './assets/bengal-cat.avif'
import cat2 from './assets/bengal-cat-walking.avif'
import cat3 from './assets/bengal-cat-on-wheel.avif'

const sections = [
  {
    image: hero,
    title: 'Minoki Cats',
    text: 'A refined world of modern cat living.',
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
    text: 'Dynamic motion and feline energy.',
    fit: 'cover',
  },
  {
    image: cat3,
    title: 'Play',
    text: 'Curiosity, interaction, and joy.',
    fit: 'cover',
  },
]

export default function App() {
  return (
    <div style={{ background: '#000', scrollBehavior: 'smooth' }}>
      {sections.map((section, index) => (
        <section
          key={section.title}
          style={{
            position: index === 1 ? 'sticky' : 'relative',            top: index === 1 ? 0 : 'auto',
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
            <img
              src={logo}
              alt="Minoki"
              style={{
                position: 'absolute',
                top: '40px',
                left: '40px',
                height: '140px',
                zIndex: 3,
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
              zIndex: 2,
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: '400', margin: 0 }}>
              {section.title}
            </h2>
            <p style={{ marginTop: '14px', lineHeight: '1.6', fontSize: '16px' }}>
              {section.text}
            </p>
          </div>
        </section>
      ))}
    </div>
  )
}
