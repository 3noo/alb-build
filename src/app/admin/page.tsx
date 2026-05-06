import { ExternalLink, Plus } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { createProjectAction } from "./actions";
import { getProjects } from "@/lib/portfolio-store";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <AdminShell>
      <div className="admin-page-head">
        <div>
          <span className="admin-kicker">Portfolio management</span>
          <h1>Projects</h1>
        </div>
        <p>Review the public portfolio list first. Add new project entries below when new work is ready to publish.</p>
      </div>

      <div className="admin-section-head">
        <h2>Project list</h2>
        <p>{projects.length} portfolio items available to the public site.</p>
        <a className="text-link" href="/portfolio" target="_blank" rel="noreferrer">
          View public page <ExternalLink size={15} />
        </a>
      </div>

      <div className="table admin-project-table">
        <div className="table-row table-head">
          <span>Image</span>
          <span>Project</span>
          <span>Status</span>
          <span>Featured</span>
          <span>Year</span>
        </div>
        {projects.map((project) => (
          <div className="table-row" key={project.id}>
            <img src={project.coverImage} alt="" />
            <div>
              <strong>{project.title}</strong>
              <p className="muted">{project.location} · {project.category} · {project.area}</p>
            </div>
            <span>{project.status === "in-progress" ? "In progress" : "Completed"}</span>
            <span>{project.featured ? "Yes" : "No"}</span>
            <span>{project.year}</span>
          </div>
        ))}
      </div>

      <div className="admin-section-head add-head">
        <h2>Add project</h2>
        <p>Create a new portfolio listing. It will appear on `/portfolio` after saving.</p>
      </div>

        <form action={createProjectAction} className="form-grid admin-form" id="add-project">
          <div className="field">
            <label htmlFor="title">Project title</label>
            <input id="title" name="title" required placeholder="Industrial Warehouse Frame" />
          </div>
          <div className="field">
            <label htmlFor="category">Category</label>
            <input id="category" name="category" required placeholder="Steel Structure" />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" required placeholder="Tirana, Albania" />
          </div>
          <div className="field">
            <label htmlFor="year">Year</label>
            <input id="year" name="year" required placeholder="2026" />
          </div>
          <div className="field">
            <label htmlFor="client">Client</label>
            <input id="client" name="client" required placeholder="Private logistics operator" />
          </div>
          <div className="field">
            <label htmlFor="area">Area</label>
            <input id="area" name="area" required placeholder="3,800 m2" />
          </div>
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue="completed">
              <option value="completed">Completed</option>
              <option value="in-progress">In progress</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="coverImage">Image URL</label>
            <input id="coverImage" name="coverImage" required placeholder="https://..." />
          </div>
          <div className="field full">
            <label htmlFor="summary">Summary</label>
            <textarea id="summary" name="summary" required placeholder="Short project description for the portfolio." />
          </div>
          <div className="field full">
            <label htmlFor="scope">Scope</label>
            <textarea id="scope" name="scope" required placeholder={"Structural design\nSteel fabrication\nSite assembly"} />
          </div>
          <label className="field full" style={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
            <input name="featured" type="checkbox" defaultChecked />
            <span>Show as featured on homepage</span>
          </label>
          <button className="button" type="submit">
            <Plus size={18} /> Add portfolio item
          </button>
        </form>

    </AdminShell>
  );
}
