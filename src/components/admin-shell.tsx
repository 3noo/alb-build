import Link from "next/link";
import { FolderKanban, Home, LogOut, Plus } from "lucide-react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="admin-app">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-logo">Alb Build</Link>
        <p>Portfolio control panel for adding steel construction projects and checking public listings.</p>
        <nav className="admin-nav">
          <Link href="/admin"><FolderKanban size={16} /> Portfolio</Link>
          <a href="#add-project"><Plus size={16} /> Add project</a>
          <Link href="/"><Home size={16} /> Public site</Link>
        </nav>
        <form action="/admin/logout" method="post" className="admin-logout">
          <button type="submit"><LogOut size={16} /> Sign out</button>
        </form>
      </aside>
      <section className="admin-content">{children}</section>
    </main>
  );
}
