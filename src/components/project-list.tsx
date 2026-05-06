import type { PortfolioProject } from "@/lib/types";

export function ProjectList({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project" key={project.id}>
          <img src={project.coverImage} alt={project.title} />
          <div className="project-body">
            <div className="meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
              <span>{project.status === "in-progress" ? "In progress" : "Completed"}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="muted">{project.summary}</p>
            <dl className="project-specs">
              <div><dt>Location</dt><dd>{project.location}</dd></div>
              <div><dt>Client</dt><dd>{project.client}</dd></div>
              <div><dt>Area</dt><dd>{project.area}</dd></div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}
