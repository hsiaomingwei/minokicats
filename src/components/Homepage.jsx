import { sections, logoImage } from '../data/sections'
import '../styles/homepage.css'

export default function Homepage() {
  return (
    <main className="homepage">
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`panel panel-${section.id}`}
          aria-label={section.alt}
        >
          <img
            className="panel-image"
            src={section.image}
            alt={section.alt}
          />

          {index === 0 && (
            <div className="logo-overlay">
              <img src={logoImage} alt="Logo" className="logo-image" />
            </div>
          )}
        </section>
      ))}
    </main>
  )
}
