"use client";

import { useEffect, useState } from "react";

type Clinic = {
  id: string;
  name: string;
  address: string;
  description: string | null;
  specialties: Array<{ specialty: { name: string } }>;
};

type FeaturedClinicsProps = {
  query: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function FeaturedClinics({ query }: FeaturedClinicsProps) {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;

    const params = new URLSearchParams({ city: "moradabad" });
    if (query.trim()) {
      params.set("q", query.trim());
    }

    fetch(`${apiUrl}/clinics?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("The clinic service returned an error.");
        }
        return response.json() as Promise<Clinic[]>;
      })
      .then((data) => {
        if (active) {
          setClinics(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) {
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [query]);

  return (
    <section className="featured-clinics" aria-labelledby="featured-clinics-heading">
      <div className="section-heading">
        <p className="eyebrow">Verified providers</p>
        <h2 id="featured-clinics-heading">
          {query ? `Results for “${query}”` : "Clinics in Moradabad"}
        </h2>
      </div>

      {status === "loading" && <p className="state-message">Loading clinics...</p>}
      {status === "error" && (
        <p className="state-message error-message">
          Clinics are temporarily unavailable. Please try again shortly.
        </p>
      )}
      {status === "ready" && clinics.length === 0 && (
        <p className="state-message">
          No verified clinics are published in this area yet.
        </p>
      )}
      {status === "ready" && clinics.length > 0 && (
        <div className="clinic-grid">
          {clinics.map((clinic) => (
            <article className="clinic-card" key={clinic.id}>
              <div className="clinic-card-heading">
                <h3>{clinic.name}</h3>
                <span className="verified-badge">Verified</span>
              </div>
              <p>{clinic.address}</p>
              {clinic.description && <p>{clinic.description}</p>}
              <div className="clinic-tags">
                {clinic.specialties.map(({ specialty }) => (
                  <span key={specialty.name}>{specialty.name}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
