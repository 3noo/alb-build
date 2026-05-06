import { ProjectList } from "@/components/project-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProjects } from "@/lib/portfolio-store";
import { deliveryStandards } from "@/lib/site-content";

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <span className="eyebrow">Portfolio</span>
          <h1>Built steel projects and active site work.</h1>
          <p>
            A practical record of warehouses, production facilities, canopies, extensions, and metal structures.
          </p>
        </section>
        <section className="section">
          <ProjectList projects={projects} />
        </section>
        <section className="section white compact-section">
          <div className="section-head">
            <h2>Project records</h2>
            <p>Each listing is meant to show the kind of structure, scope, location, year, and delivery responsibility.</p>
          </div>
          <div className="two-column-list">
            {deliveryStandards.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
