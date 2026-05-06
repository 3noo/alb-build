import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contact, contactResponse, quoteChecklist } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="hero-inner">
            <span className="eyebrow">Kontakt & Kërkesa</span>
            <h1>Le të ndërtojmë strukturën tuaj tjetër.</h1>
            <p>
              Dërgoni koordinatat, planet ose sfidat tuaja. Specializohemi në ofrimin e zgjidhjeve reale me shpejtësi dhe efikasitet.
            </p>
          </div>
        </section>

        <section className="section contact-grid" style={{ paddingTop: "74px", paddingBottom: "74px" }}>
          <div className="animate-rise stagger-1">
            <h2>Fillo një Dialog Projekti</h2>
            <p className="muted" style={{ maxWidth: "500px", marginBottom: "24px" }}>
              Për të siguruar vlerësime të shpejta, ju lutemi mblidhni sa më shumë nga informacioni i mëposhtëm:
            </p>

            <div className="home-detail" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px", background: "transparent" }}>
              {quoteChecklist.map((item, i) => (
                <article
                  key={item}
                  style={{ background: "white", padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: "12px", border: "1px solid var(--line)", borderLeft: "3px solid var(--ink)" }}
                >
                  <ArrowRight size={16} color="var(--ink)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--ink)", lineHeight: "1.4" }}>{item}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="contact-panel animate-rise stagger-2" style={{ background: "var(--ink)", color: "white", borderRadius: "0px", overflow: "hidden", border: "none" }}>
            <div style={{ padding: "32px 32px 24px", borderBottom: "1px solid var(--steel-dark)" }}>
              <h3 style={{ margin: 0, fontSize: "24px", color: "white" }}>Linjat Direkte</h3>
              <p style={{ color: "#a0a0a0", marginTop: "8px", fontSize: "14px" }}>Lidhuni drejtpërdrejt me departamentet tona të inxhinierisë dhe menaxhimit.</p>
            </div>

            <a href={`tel:${contact.phone.replaceAll(" ", "")}`} style={{ color: "white", borderColor: "var(--steel-dark)", padding: "20px 32px", fontSize: "16px" }} className="hover-highlight">
              <Phone size={20} style={{ opacity: 0.7 }} /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} style={{ color: "white", borderColor: "var(--steel-dark)", padding: "20px 32px", fontSize: "16px" }} className="hover-highlight">
              <Mail size={20} style={{ opacity: 0.7 }} /> {contact.email}
            </a>
            <span style={{ color: "white", borderColor: "var(--steel-dark)", padding: "20px 32px", fontSize: "16px" }}>
              <MapPin size={20} style={{ opacity: 0.7 }} /> {contact.location}
            </span>
            <span style={{ color: "white", borderColor: "none", padding: "20px 32px", fontSize: "16px" }}>
              <Clock size={20} style={{ opacity: 0.7 }} /> {contact.hours}
            </span>
          </div>
        </section>

        <section className="section white compact-section">
          <div className="section-head animate-rise stagger-1">
            <h2>Sekuenca e Mirëpritjes</h2>
            <p>Procesi ynë transparent siguron qartësi të plotë menjëherë pas kërkesës suaj.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", paddingTop: "20px" }}>
            {contactResponse.map((item, i) => (
              <article
                key={item}
                className={`animate-rise stagger-${i + 1}`}
                style={{
                  background: "var(--paper)",
                  padding: "40px 32px",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)"
                }}
              >
                <span className="eyebrow" style={{ color: "var(--accent)", fontSize: "14px" }}>Faza 0{i + 1}</span>
                <h3 style={{ marginTop: "16px", fontSize: "18px", lineHeight: "1.5", fontWeight: "700" }}>{item}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-highlight:hover { background: var(--steel-dark); }
      `}} />
      <SiteFooter />
    </>
  );
}
