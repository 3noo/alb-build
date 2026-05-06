import { Lock, ShieldCheck } from "lucide-react";
import { loginAction } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <main className="admin-login">
      <section className="admin-login-panel">
        <div>
          <a href="/" className="admin-logo">Alb Build</a>
          <span className="admin-kicker"><ShieldCheck size={15} /> Panel i mbrojtur</span>
          <h1>Hyr në panel</h1>
          <p>
            Hyr për të shtuar projekte çeliku, për të përditësuar listimet dhe për të parë çfarë shfaqet në portofolin publik.
          </p>
        </div>

        <form action={loginAction} className="admin-login-form">
          <div className="field full">
            <label htmlFor="password">Fjalëkalimi</label>
            <input id="password" name="password" type="password" required placeholder="Shkruaj fjalëkalimin" />
          </div>
          {params.error ? <p className="form-error">Fjalëkalimi është i gabuar.</p> : null}
          <button className="button" type="submit">
            <Lock size={17} /> Hyr
          </button>
          <p className="admin-hint">Local dev password: <strong>admin123</strong>. Use `ADMIN_PASSWORD` for deployment.</p>
        </form>
      </section>
    </main>
  );
}
