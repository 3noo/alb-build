import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, deliveryStandards, materials, serviceDetails, services } from "@/lib/site-content";

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <span className="eyebrow">Services</span>
          <h1>Design, fabrication, mounting, panels, and metalwork.</h1>
          <p>
            A compact offer for industrial clients, property owners, and contractors who need steel delivered cleanly.
          </p>
        </section>
        <section className="section compact-section">
          <div className="info-grid">
            <article>
              <h2>Scope covered</h2>
              <p className="muted">From the first site check to fabrication, transport, assembly, and final corrections.</p>
            </article>
            <article>
              <h3>Capabilities</h3>
              <ul className="plain-list">
                {capabilities.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article>
              <h3>Materials</h3>
              <ul className="plain-list">
                {materials.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>
        </section>
        <section className="section white">
          <div className="service-list">
            {services.map((service, index) => (
              <article key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{service}</h2>
                <p className="muted">{serviceDetails[service]}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section compact-section">
          <div className="section-head">
            <h2>Delivery checks</h2>
            <p>Small details that reduce site delays, missing parts, and unclear responsibility during installation.</p>
          </div>
          <div className="two-column-list">
            {deliveryStandards.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
