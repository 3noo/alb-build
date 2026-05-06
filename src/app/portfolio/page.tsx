import { ArrowRight, Drill, FolderCheck, HardHat, ScrollText } from "lucide-react";
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
            <span className="eyebrow">Portfolio</span>
            <h1>Architectural precision <br />in industrial steel.</h1>
            <p>
              A visual record of our completed warehouses, production facilities, canopies, and monumental steel structures.
            </p>
          </div>
        </section>
        
        <section className="section white">
          <ProjectList projects={projects} />
        </section>

        <section className="section compact-section" style={{ background: "var(--ink)", color: "white" }}>
          <div className="section-head animate-rise stagger-1" style={{ borderBottomColor: "var(--steel-dark)" }}>
            <h2 style={{ color: "white" }}>The Anatomy of Every Project</h2>
            <p style={{ color: "#a0a0a0" }}>Beyond the visual impact, every listing signifies a complex execution of engineering, logistics, and accountability.</p>
          </div>
          
          <div className="home-detail" style={{ gap: "16px", background: "transparent", marginTop: "32px" }}>
            {deliveryStandards.slice(0, 3).map((item, i) => (
              <article key={item} className={`animate-rise stagger-${i+2}`} style={{ background: "var(--steel-dark)", borderColor: "var(--steel)", border: "1px solid var(--steel)" }}>
                <FolderCheck size={28} color="white" />
                <h3 style={{ marginTop: "16px", color: "white", fontSize: "16px" }}>{item}</h3>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "42px" }} className="animate-rise stagger-4">
            <a className="button secondary light" href="/contact">Ready to build? Let's talk <ArrowRight size={16} /></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
