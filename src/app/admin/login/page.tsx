import { Lock, ShieldCheck } from "lucide-react";
import { loginAction } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <main className="admin-login">
      <section className="admin-login-panel">
        <div>
          <a href="/" className="admin-logo">Alb Build</a>
          <span className="admin-kicker"><ShieldCheck size={15} /> Protected dashboard</span>
          <h1>Portfolio admin</h1>
          <p>
            Sign in to add steel construction projects, update listing details, and review what appears on the public
            portfolio page.
          </p>
        </div>

        <form action={loginAction} className="admin-login-form">
          <div className="field full">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required placeholder="Enter admin password" />
          </div>
          {params.error ? <p className="form-error">Password is not correct.</p> : null}
          <button className="button" type="submit">
            <Lock size={17} /> Enter admin
          </button>
          <p className="admin-hint">Local dev password: <strong>admin123</strong>. Use `ADMIN_PASSWORD` for deployment.</p>
        </form>
      </section>
    </main>
  );
}
