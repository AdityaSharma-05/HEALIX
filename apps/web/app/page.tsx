"use client";

import { FeaturedClinics } from "./featured-clinics";
import { FormEvent, useState } from "react";

const specialties = [
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Pediatrician"
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(searchInput);
  }

  function selectSpecialty(specialty: string) {
    setSearchInput(specialty);
    setQuery(specialty);
  }

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

        <form className="search-panel" onSubmit={submitSearch}>
          <label>
            What do you need help with?
            <input
              name="query"
              placeholder="Specialty, doctor, or clinic"
              aria-label="Search for a specialty, doctor, or clinic"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
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
            <button
              className="specialty-card"
              key={specialty}
              type="button"
              onClick={() => selectSpecialty(specialty)}
            >
              {specialty}
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      <FeaturedClinics query={query} />
    </main>
  );
}
