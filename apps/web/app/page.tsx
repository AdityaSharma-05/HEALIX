import { FeaturedClinics } from "./featured-clinics";

const specialties = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Pediatrician"
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <nav className="nav">
        <span className="brand">Healix</span>
        <span className="location">Moradabad, Uttar Pradesh</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">Trusted healthcare discovery</p>
        <h1>Find the right clinic for your care.</h1>
        <p className="hero-copy">
          Discover verified healthcare providers in Moradabad, compare what
          matters, and request an appointment with confidence.
        </p>

        <form className="search-panel">
          <label>
            What do you need help with?
            <input
              name="query"
              placeholder="Specialty, doctor, or clinic"
              aria-label="Search for a specialty, doctor, or clinic"
            />
          </label>
          <label>
            Area
            <input
              name="area"
              placeholder="Area or landmark"
              aria-label="Search by area or landmark"
            />
          </label>
          <button type="submit">Find care</button>
        </form>
      </section>

      <section className="specialties" aria-labelledby="specialties-heading">
        <div>
          <p className="eyebrow">Start with a specialty</p>
          <h2 id="specialties-heading">Care for your needs</h2>
        </div>
        <div className="specialty-grid">
          {specialties.map((specialty) => (
            <button className="specialty-card" key={specialty} type="button">
              {specialty}
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      <FeaturedClinics />
    </main>
  );
}
