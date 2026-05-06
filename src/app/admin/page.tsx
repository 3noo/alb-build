import { ExternalLink } from "lucide-react";
import { createProjectAction, deleteProjectAction } from "./actions";
import { getProjects } from "@/lib/portfolio-store";
import { AdminUploadForm } from "./upload-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Top bar */}
      <header className="admin-topbar">
        <span className="admin-topbar-brand">Alb Build · Admin</span>
        <div className="admin-topbar-actions">
          <a href="/portfolio" target="_blank" rel="noreferrer">
            Portofoli publik <ExternalLink size={12} style={{ display: "inline", verticalAlign: "middle" }} />
          </a>
          <form action="/admin/logout" method="post">
            <button type="submit">Dil</button>
          </form>
        </div>
      </header>

      <div className="admin-page">
        <h1>Projektet</h1>
        <p className="muted">{projects.length} projekte në portofol.</p>

        {/* Projects grid */}
        <div className="admin-section-title">
          <h2>Të gjitha projektet</h2>
          <span>{projects.length} gjithsej</span>
        </div>

        {projects.length === 0 ? (
          <p className="admin-empty">Nuk ka projekte ende. Shto njërin më poshtë.</p>
        ) : (
          <div className="admin-card-grid">
            {projects.map((project) => (
              <div className="admin-card" key={project.id}>
                <img src={project.cover_image} alt={project.title} />
                <form action={deleteProjectAction} style={{ display: "contents" }}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    className="admin-card-delete"
                    title="Fshi projektin"
                  >×</button>
                </form>
                <div className="admin-card-body">
                  <strong>{project.title}</strong>
                  <span>{project.city} · {project.category} · {project.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add project */}
        <div className="admin-section-title" style={{ marginTop: "60px" }}>
          <h2>Shto projekt</h2>
        </div>

        <AdminUploadForm createProjectAction={createProjectAction} />
      </div>
    </>
  );
}
