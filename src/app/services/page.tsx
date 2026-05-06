import { CheckCircle2, ChevronRight, DraftingCompass, Frame, Hammer, MoveRight } from "lucide-react";
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
            <span className="eyebrow">Services</span>
            <h1>Engineering. Fabrication. <br/>Precision Assembly.</h1>
            <p>
              A formidable suite of services for industrial clients who rely on flawless steel delivery and integration.
            </p>
          </div>
        </section>

        <section className="section compact-section white">
          <div className="info-grid">
            <article className="animate-rise stagger-1" style={{ border: "none", borderRight: "1px solid var(--line)" }}>
              <DraftingCompass size={28} style={{ marginBottom: "16px" }} />
              <h2>Full Scope Coverage</h2>
              <p className="muted">From sweeping architectural frameworks down to the finishing gutters, we handle calculation, construction, and corrections to perfection.</p>
            </article>
            <article className="animate-rise stagger-2" style={{ border: "none", borderRight: "1px solid var(--line)" }}>
              <h3>Primary Capabilities</h3>
              <ul className="plain-list">
                {capabilities.slice(0, 5).map((item) => (
                  <li key={item} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                     <ChevronRight size={14} className="muted" /> {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="animate-rise stagger-3" style={{ border: "none" }}>
              <h3>Premium Materials</h3>
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
            <h2>Our Specialized Expertise</h2>
            <p>We execute heavy-duty assemblies and architectural highlights with identical dedication to safety and scale.</p>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article key={service} className={`animate-rise stagger-${(index % 4) + 1}`} style={{ transition: "all 0.2s ease" }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                   {service}
                </h2>
                <p className="muted" style={{ margin: 0 }}>{serviceDetails[service]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section compact-section" style={{ background: "var(--ink)", color: "white" }}>
          <div className="section-head" style={{ borderBottomColor: "var(--steel-dark)" }}>
             <h2 style={{ color: "white" }}>Standards of Delivery</h2>
             <p style={{ color: "#a0a0a0" }}>Zero delays. Ultimate clarity. We enforce rigorous pre-checks to keep massive structures flowing smoothly onto your site.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
             {deliveryStandards.map((item, i) => (
               <article key={item} className={`animate-rise stagger-${(i % 3) + 1}`} style={{ 
                 background: "var(--ink)", 
                 border: "1px solid var(--steel)", 
                 padding: "32px",
                 borderRadius: "12px",
                 transition: "transform 0.3s ease, border-color 0.3s ease"
               }}>
                 <CheckCircle2 size={28} color="white" style={{ marginBottom: "16px" }} />
                 <h3 style={{ color: "white", fontSize: "16px", lineHeight: "1.5" }}>{item}</h3>
               </article>
             ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "42px" }} className="animate-rise stagger-4">
             <a className="button" href="/contact">Require these services? <MoveRight size={16} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
