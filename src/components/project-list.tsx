import type { PortfolioProject } from "@/lib/types";

export function ProjectList({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project" key={project.id} style={{ borderRadius: "8px", overflow: "hidden" }}>
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
        </article>
      ))}
    </div>
  );
}
