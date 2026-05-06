import { ArrowRight, FolderCheck } from "lucide-react";
import { ProjectList } from "@/components/project-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProjects } from "@/lib/portfolio-store";
import { deliveryStandards } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="hero-inner">
            <span className="eyebrow">Portofoli</span>
            <h1>Saktësi arkitektonike <br />në çelik industrial.</h1>
            <p>
              Një regjistër vizual i magazinave, objekteve të prodhimit, tendave dhe strukturave monumentale çeliku.
            </p>
          </div>
        </section>

        <section className="section white">
          <ProjectList projects={projects} />
        </section>

        <section style={{ background: "var(--ink)", color: "white", padding: "32px clamp(16px, 4vw, 46px)" }}>
          <div className="section-head" style={{ borderBottomColor: "var(--steel-dark)" }}>
            <h2 style={{ color: "white" }}>Anatomia e Çdo Projekti</h2>
            <p style={{ color: "#a0a0a0" }}>Përtej ndikimit vizual, çdo listim nënkupton ekzekutim kompleks inxhinierik, logjistik dhe llogaridhënës.</p>
          </div>

          <div className="home-detail" style={{ gap: "16px", background: "transparent", marginTop: "24px" }}>
            {deliveryStandards.slice(0, 3).map((item, i) => (
              <article
                key={item}
                style={{ background: "var(--steel-dark)", borderColor: "var(--steel)", border: "1px solid var(--steel)" }}
              >
                <FolderCheck size={28} color="white" />
                <h3 style={{ marginTop: "12px", color: "white", fontSize: "16px" }}>{item}</h3>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <a className="button secondary light" href="/contact">Gati të ndërtoni? Le të flasim <ArrowRight size={16} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
