"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contact } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer style={{
      background: "var(--ink)",
      color: "white",
      padding: "100px clamp(16px, 4vw, 46px) 40px",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: "-50%",
        right: "-10%",
        width: "60vw",
        height: "60vw",
        background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)",
        animation: "slow-zoom 15s ease-in-out infinite alternate"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 style={{
          fontSize: "clamp(48px, 8vw, 120px)",
          margin: "0 0 60px",
          lineHeight: "0.9",
          letterSpacing: "-0.04em",
          fontWeight: 900
        }}>
          Ndërtojmë Bashkë.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          borderTop: "1px solid var(--steel)",
          paddingTop: "60px"
        }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>Kontakt</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
              <a href={`tel:${contact.phone.replaceAll(" ", "")}`} style={{ fontSize: "20px", fontWeight: "600", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--muted)"} onMouseOut={e => e.currentTarget.style.color = "white"}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`} style={{ fontSize: "20px", fontWeight: "600", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "var(--muted)"} onMouseOut={e => e.currentTarget.style.color = "white"}>{contact.email}</a>
            </div>
          </div>

          <div>
            <span className="eyebrow" style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>Vendndodhja</span>
            <p style={{ marginTop: "24px", fontSize: "18px", lineHeight: "1.6", maxWidth: "200px" }}>{contact.location}</p>
          </div>

          <div>
            <Link href="/contact" className="button secondary light" style={{
              fontSize: "18px",
              padding: "18px 32px",
              borderRadius: "4px",
              display: "inline-flex",
              alignItems: "center"
            }}>
              Fillo një projekt <ArrowRight size={20} style={{ marginLeft: "8px" }} />
            </Link>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--steel)",
          marginTop: "80px",
          paddingTop: "32px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "16px",
          color: "var(--muted)",
          fontSize: "13px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
          <span>© {new Date().getFullYear()} Alb-Build Construction</span>
          <span>Ndërtuar për forcë</span>
        </div>
      </div>
    </footer>
  );
}
