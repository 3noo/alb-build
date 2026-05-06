import { ArrowUpRight, ArrowRight, ShieldCheck, Factory, HardHat, Hammer, MapPin, Truck, ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, serviceDetails } from "@/lib/site-content";
import { getProjects } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <span className="eyebrow">Alb-Build Solutions</span>
            <h1>Forging the Future in Steel Construction.</h1>
            <p>
              Engineered to last. Built to impress. From massive industrial warehouses to complex site extensions, we turn bold plans into solid reality.
            </p>
            <div className="hero-actions">
              <a className="button" href="/portfolio">
                View Our Work <ArrowUpRight size={18} />
              </a>
              <a className="button secondary light" href="/contact">
                Start a Project <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="proof animate-rise stagger-2">
          <div>
            <strong>12+</strong>
            <span>Years of Excellence</span>
          </div>
          <div>
            <strong>80+</strong>
            <span>Major Projects Delivered</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>In-house Fabrication</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Unified Expert Team</span>
          </div>
        </section>

        <section className="section compact-section">
          <div className="info-grid">
            <article className="animate-rise stagger-1">
              <span className="eyebrow">Our Speciality</span>
              <h2>Industrial steel engineered for extreme conditions.</h2>
              <p className="muted" style={{ marginTop: "16px" }}>
                We don't just build structures; we craft industrial ecosystems that withstand the test of time, operations, and weather.
              </p>
            </article>
            <article className="animate-rise stagger-2">
              <h3>Core Strengths</h3>
              <ul className="plain-list">
                {Object.keys(serviceDetails).slice(0, 4).map((title) => (
                  <li key={title} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ArrowRight size={14} className="muted" /> {title}
                  </li>
                ))}
              </ul>
            </article>
            <article className="animate-rise stagger-3">
              <h3>Our Capabilities</h3>
              <ul className="plain-list">
                {capabilities.slice(0, 4).map((cap) => (
                  <li key={cap} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ShieldCheck size={14} className="muted" /> {cap}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {featuredProjects.length > 0 && (
          <section className="section white compact-section">
            <div className="section-head animate-rise stagger-1">
              <h2>Featured Projects</h2>
              <p>Discover how we've transformed industrial visions into monumental steel realities across the region.</p>
            </div>
            <div className="project-grid">
              {featuredProjects.map((project, i) => (
                <a href="/portfolio" key={project.id} className={`project animate-rise stagger-${i + 1}`}>
                  <img src={project.coverImage} alt={project.title} style={{ aspectRatio: "16 / 9" }} />
                  <div className="project-body">
                    <div className="meta">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="muted">{project.summary}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", fontSize: "12px", color: "var(--muted)", fontWeight: "bold", textTransform: "uppercase" }}>
                      <MapPin size={14} /> {project.location}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="section-action" style={{ textAlign: "center", marginTop: "36px" }}>
              <a className="button" href="/portfolio">See All Projects</a>
            </div>
          </section>
        )}

        <section className="section compact-section">
          <div className="section-head">
            <h2>The Construction Lifecycle</h2>
            <p>A flawless project demands precision at every stage. Here is how we ensure zero surprises on site.</p>
          </div>
          <div className="home-detail">
            <article className="animate-rise stagger-1">
              <HardHat size={28} color="var(--accent)" />
              <h3 style={{ marginTop: "12px" }}>Precision Engineering</h3>
              <p className="muted">Laser-accurate site measurements and deep structural assessments ensure the design matches the physical reality perfectly.</p>
            </article>
            <article className="animate-rise stagger-2">
              <Factory size={28} color="var(--accent)" />
              <h3 style={{ marginTop: "12px" }}>Advanced Fabrication</h3>
              <p className="muted">In our high-tech workshop, every beam is precision-cut, welded, and pre-treated for maximum durability and perfect alignment.</p>
            </article>
            <article className="animate-rise stagger-3">
              <Truck size={28} color="var(--accent)" />
              <h3 style={{ marginTop: "12px" }}>Precision On-Site Assembly</h3>
              <p className="muted">Our specialized crews handle transport, sequencing, and structural mounting on-site, delivering efficient assembly with uncompromised safety.</p>
            </article>
          </div>
        </section>

        <section className="section home-band">
          <div>
            <Hammer size={24} />
            <strong>Ready to elevate your next industrial project?</strong>
          </div>
          <p>Bring us your blueprints, sketches, or ideas. We'll handle the heavy lifting, from initial quote to final bolt.</p>
          <a className="button" href="/contact">Request a Quote</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
