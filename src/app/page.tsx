import { ArrowUpRight, Briefcase, ClipboardCheck, Factory, Hammer, Phone, Ruler, ShieldCheck, Truck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { materials } from "@/lib/site-content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <span className="eyebrow">Steel construction and site delivery</span>
            <h1>Steel work for warehouses, factories, and site extensions.</h1>
            <p>
              Measurements, workshop fabrication, mounting, roofing, panels, and finishing handled by one practical team.
            </p>
            <div className="hero-actions">
              <a className="button" href="/portfolio">Portfolio <ArrowUpRight size={18} /></a>
              <a className="button secondary light" href="/contact"><Phone size={18} /> Contact</a>
            </div>
          </div>
        </section>

        <section className="section compact-section">
          <div className="info-grid">
            <article>
              <span className="eyebrow">What we build</span>
              <h2>Industrial steel, prepared for real site conditions.</h2>
            </article>
            <article>
              <h3>Typical work</h3>
              <ul className="plain-list">
                <li>Warehouses and production halls</li>
                <li>Canopies, platforms, stairs, railings</li>
                <li>Roof and facade panel installation</li>
                <li>Steel repairs and building extensions</li>
              </ul>
            </article>
            <article>
              <h3>Materials</h3>
              <ul className="plain-list">
                {materials.slice(0, 5).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          </div>
        </section>

        <section className="proof">
          <div><strong>12+</strong><span>Years on industrial sites</span></div>
          <div><strong>80+</strong><span>Steel and metalwork projects</span></div>
          <div><strong>3</strong><span>Design, fabrication, mounting</span></div>
          <div><strong>1</strong><span>Team from workshop to handover</span></div>
        </section>

        <section className="section compact-section">
          <div className="home-detail">
            <article>
              <Ruler size={18} />
              <h3>Measured before pricing</h3>
              <p className="muted">Site access, dimensions, roof lines, anchor points, and existing structure are checked before scope is fixed.</p>
            </article>
            <article>
              <Factory size={18} />
              <h3>Fabricated in sequence</h3>
              <p className="muted">Steel elements are cut, welded, drilled, treated, and marked so the site team can mount without confusion.</p>
            </article>
            <article>
              <Truck size={18} />
              <h3>Installed with site control</h3>
              <p className="muted">Bolts, plates, panels, flashings, gutters, and corrections are coordinated through final handover.</p>
            </article>
          </div>
        </section>

        <section className="section white compact-section">
          <div className="section-head">
            <h2>Built for practical industrial use</h2>
            <p>Most clients need a direct answer: what can be built, how it is prepared, and what stays under control on site.</p>
          </div>
          <div className="home-scope">
            <article>
              <Hammer size={18} />
              <strong>New steel structures</strong>
              <span>Warehouse frames, production halls, roof structures, loading canopies, and industrial extensions.</span>
            </article>
            <article>
              <Factory size={18} />
              <strong>Panels and envelope</strong>
              <span>Sandwich panels, facade panels, gutters, flashing, drainage details, and roof finishing work.</span>
            </article>
            <article>
              <ShieldCheck size={18} />
              <strong>Repairs and reinforcement</strong>
              <span>Added beams, stronger columns, roof support, platforms, railings, and safe interventions in existing buildings.</span>
            </article>
            <article>
              <Truck size={18} />
              <strong>Workshop to site</strong>
              <span>Fabrication, marking, loading, transport coordination, mounting sequence, and final site correction.</span>
            </article>
          </div>
        </section>

        <section className="section compact-section">
          <div className="handover-grid">
            <div>
              <span className="eyebrow">Handover discipline</span>
              <h2>Clear scope before work, fewer surprises during mounting.</h2>
              <p className="muted">The team checks access, dimensions, connection points, roof drainage, and finishing requirements before production starts.</p>
            </div>
            <ul className="plain-list handover-list">
              <li>Measured dimensions and access notes</li>
              <li>Material and finish agreement</li>
              <li>Fabrication and mounting sequence</li>
              <li>Panel, gutter, flashing, and bolt checks</li>
              <li>Final corrections before client handover</li>
            </ul>
          </div>
        </section>

        <section className="section white compact-section">
          <div className="section-head">
            <h2>Next step</h2>
            <p>Open the page that matches what the client needs: built work, service scope, or a direct quote request.</p>
          </div>
          <div className="route-grid">
            <a href="/portfolio">
              <Briefcase size={18} />
              <strong>Portfolio</strong>
              <span>Project listings, status, location, area, and client type.</span>
            </a>
            <a href="/services">
              <Factory size={18} />
              <strong>Services</strong>
              <span>Steel design, fabrication, mounting, panels, and repairs.</span>
            </a>
            <a href="/contact">
              <Phone size={18} />
              <strong>Contact</strong>
              <span>Phone, email, location, hours, and quote checklist.</span>
            </a>
          </div>
        </section>

        <section className="section home-band">
          <div>
            <ShieldCheck size={20} />
            <strong>Serious steel work starts with clear scope.</strong>
          </div>
          <p>Send drawings, photos, or the site address and the team can confirm what needs to be measured before quoting.</p>
          <a className="button" href="/contact">Request quote</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
