import { ArrowUpRight, ChevronDown, ChevronRight, Factory, HardHat, Hammer, ShieldCheck, Star, TrendingUp, Truck, Wallet } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, serviceDetails } from "@/lib/site-content";
import { getProjects } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

const heroWords = "Ndërtojmë të ardhmen në çelik.".split(" ");

export default async function Home() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Alb-Build Solutions</span>
            <h1 style={{ filter: "none" }}>
              {heroWords.map((word, i) => (
                <span
                  key={i}
                  className="hero-word"
                  style={{ animationDelay: `${i * 80}ms`, marginRight: "0.28em" }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p style={{ animationDelay: "500ms" }} className="animate-fade">
              Projektuar për të zgjatur. Ndërtuar për të mbresëlënë. Nga magazina industriale deri te zgjerimet komplekse, i kthejmë planet tuaja në realitet të fortë.
            </p>
            <div className="hero-actions">
              <a className="button" href="/portfolio">
                Shiko Punën Tonë <ArrowUpRight size={18} />
              </a>
              <a className="button secondary light" href="/contact">
                Fillo një Projekt <ChevronRight size={18} />
              </a>
            </div>
          </div>
          <div className="scroll-indicator">
            <ChevronDown size={28} />
          </div>
        </section>

        {/* PROOF BAR */}
        <section className="proof animate-rise stagger-2">
          {[
            { value: 12, suffix: "+", label: "Vite Eksperience" },
            { value: 80, suffix: "+", label: "Projekte të Mëdha" },
            { value: 100, suffix: "%", label: "Fabrikim në Shtëpi" },
            { value: 1, suffix: "", label: "Ekip i Unifikuar" },
          ].map(({ value, suffix, label }) => (
            <div key={label}>
              <strong>{value}{suffix}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        {/* SPECIALTY */}
        <section className="section compact-section">
          <div className="info-grid">
            <article className="animate-rise stagger-1">
              <span className="eyebrow">Specializimi Ynë</span>
              <h2>Çelik industrial i inxhinieruar për kushte ekstreme.</h2>
              <p className="muted" style={{ marginTop: "16px" }}>
                Ne nuk ndërtojmë vetëm struktura; krijojmë ekosisteme industriale që rezistojnë ndaj kohës, operacioneve dhe motit.
              </p>
            </article>
            <article className="animate-rise stagger-2">
              <h3>Pikat Tona Kryesore</h3>
              <ul className="plain-list">
                {Object.keys(serviceDetails).slice(0, 4).map((title) => (
                  <li key={title} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <ChevronRight size={14} className="muted" /> {title}
                  </li>
                ))}
              </ul>
            </article>
            <article className="animate-rise stagger-3">
              <h3>Kapacitetet Tona</h3>
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

        {/* FEATURED PROJECTS */}
        {featuredProjects.length > 0 && (
          <section className="section white compact-section">
            <div className="section-head animate-rise stagger-1">
              <h2>Projektet e Zgjedhura</h2>
              <p>Zbuloni si i kemi kthyer vizionet industriale në realitete monumentale çeliku në të gjithë rajonin.</p>
            </div>
            <div className="project-grid">
              {featuredProjects.map((project) => (
                <a
                  href="/portfolio"
                  key={project.id}
                  className="project animate-rise stagger-1"
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <div className="project-overlay">
                    <img src={project.cover_image} alt={project.title} />
                    <div className="project-overlay-label">Shiko →</div>
                  </div>
                  <div className="project-body">
                    <div className="meta">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="muted">{project.city}</p>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "36px" }} className="animate-rise stagger-4">
              <a className="button" href="/portfolio">Shiko të Gjitha Projektet</a>
            </div>
          </section>
        )}

        {/* HOW WE WORK */}
        <section className="section compact-section">
          <div className="section-head animate-rise stagger-1">
            <h2>Si Punojmë Ne?</h2>
            <p>Një projekt pa surpriza kërkon precizion në çdo fazë. Ja si garantojmë zero befasi në kantier.</p>
          </div>
          <div className="home-detail">
            <article className="card-hover animate-rise stagger-1" style={{ padding: "28px" }}>
              <HardHat size={32} color="var(--accent)" />
              <h3 style={{ marginTop: "16px" }}>Projektim</h3>
              <p className="muted">Matje të sakta të kantierit dhe vlerësime të thella strukturore sigurojnë që dizajni të përputhet me realitetin fizik.</p>
            </article>
            <article className="card-hover animate-rise stagger-2" style={{ padding: "28px" }}>
              <Factory size={32} color="var(--accent)" />
              <h3 style={{ marginTop: "16px" }}>Prodhim</h3>
              <p className="muted">Në punëtorinë tonë të avancuar, çdo trar pritet, saldohet dhe paratrozohet me precizion për qëndrueshmëri maksimale.</p>
            </article>
            <article className="card-hover animate-rise stagger-3" style={{ padding: "28px" }}>
              <Truck size={32} color="var(--accent)" />
              <h3 style={{ marginTop: "16px" }}>Montim</h3>
              <p className="muted">Ekipet tona të specializuara trajtojnë transportin, sekuencimin dhe montimin strukturor në kantier me efikasitet dhe siguri.</p>
            </article>
          </div>
        </section>

        {/* WHY ALB-BUILD */}
        <section className="section white compact-section">
          <div className="section-head animate-rise stagger-1">
            <h2>Përse Alb-Build?</h2>
            <p>Katër arsye pse klientët industrialë zgjedhin ne për projektet e tyre kritike.</p>
          </div>
          <div className="value-grid">
            <article className="card-hover animate-rise stagger-1" style={{ padding: "28px" }}>
              <ShieldCheck size={32} color="var(--accent)" />
              <h3>Korrektësia</h3>
              <p className="muted">Çdo projekt trajtohet me ndershmëri të plotë — nga kuotimi deri te dorëzimi final.</p>
            </article>
            <article className="card-hover animate-rise stagger-2" style={{ padding: "28px" }}>
              <TrendingUp size={32} color="var(--accent)" />
              <h3>Eksperienca</h3>
              <p className="muted">Mbi 12 vite ndërtim industrial aktiv në tregun shqiptar dhe rajonal.</p>
            </article>
            <article className="card-hover animate-rise stagger-3" style={{ padding: "28px" }}>
              <Wallet size={32} color="var(--accent)" />
              <h3>Çmimi Konkurrues</h3>
              <p className="muted">Cilësi e lartë e inxhinierisë me çmime të balancuara dhe transparente — pa kosto të fshehura.</p>
            </article>
            <article className="card-hover animate-rise stagger-4" style={{ padding: "28px" }}>
              <Star size={32} color="var(--accent)" />
              <h3>Cilësia</h3>
              <p className="muted">Standardet tona të prodhimit dhe montimit garantojnë struktura që zgjasin dekada.</p>
            </article>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="section home-band">
          <div>
            <Hammer size={24} />
            <strong>Gati për projektin tuaj tjetër?</strong>
          </div>
          <p>Sillni tek ne planet, skicat ose idetë tuaja. Ne do të merremi me ngritjen, nga kuotimi fillestar deri te buloni i fundit.</p>
          <a className="button" href="/contact">Kërko një Kuotim</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
