import { CheckCircle2, ChevronRight, DraftingCompass, MoveRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, deliveryStandards, materials, serviceDetails, services } from "@/lib/site-content";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="hero-inner">
            <span className="eyebrow">Shërbimet</span>
            <h1>Inxhinieri. Fabrikim. <br/>Montim me Precizion.</h1>
            <p>
              Një gamë e fuqishme shërbimesh për klientë industrialë që mbështeten në dorëzim të pagabueshëm çeliku.
            </p>
          </div>
        </section>

        <section className="section compact-section white">
          <div className="info-grid">
            <article className="animate-rise stagger-1" style={{ border: "none", borderRight: "1px solid var(--line)" }}>
              <DraftingCompass size={28} style={{ marginBottom: "16px" }} />
              <h2>Mbulim i Plotë</h2>
              <p className="muted">Nga kornizat arkitekturore deri te grykët e fundit, trajtojmë llogaritjen, ndërtimin dhe korrigjimet me përsosmëri.</p>
            </article>
            <article className="animate-rise stagger-2" style={{ border: "none", borderRight: "1px solid var(--line)" }}>
              <h3>Kapacitetet Kryesore</h3>
              <ul className="plain-list">
                {capabilities.slice(0, 5).map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ChevronRight size={14} className="muted" /> {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="animate-rise stagger-3" style={{ border: "none" }}>
              <h3>Materialet Kryesore</h3>
              <ul className="plain-list">
                {materials.map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ChevronRight size={14} className="muted" /> {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-head animate-rise stagger-1">
            <h2>Ekspertiza Jonë e Specializuar</h2>
            <p>Ekzekutojmë montazhe të rënda dhe theksime arkitektonike me të njëjtën dedikimin ndaj sigurisë dhe shkallës.</p>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article
                key={service}
                style={{ transition: "all 0.2s ease" }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>{service}</h2>
                <p className="muted" style={{ margin: 0 }}>{serviceDetails[service]}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--ink)", color: "white", padding: "32px clamp(16px, 4vw, 46px)" }}>
          <div className="section-head" style={{ borderBottomColor: "var(--steel-dark)" }}>
            <h2 style={{ color: "white" }}>Standardet e Dorëzimit</h2>
            <p style={{ color: "#a0a0a0" }}>Zero vonesa. Qartësi e plotë. Zbatojmë kontrolle rigoroze para-prodhimit.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "24px" }}>
            {deliveryStandards.map((item) => (
              <article
                key={item}
                style={{
                  background: "var(--ink)",
                  border: "1px solid var(--steel)",
                  padding: "20px 24px",
                  borderRadius: "8px",
                }}
              >
                <CheckCircle2 size={22} color="white" style={{ marginBottom: "10px" }} />
                <h3 style={{ color: "white", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>{item}</h3>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <a className="button" href="/contact">Keni nevojë për këto shërbime? <MoveRight size={16} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
