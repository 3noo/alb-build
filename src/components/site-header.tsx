import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <>
      <div className="topbar">
        <span><Phone size={14} /> {contact.phone}</span>
        <span><Mail size={14} /> {contact.email}</span>
        <span><MapPin size={14} /> {contact.location}</span>
        <span>{contact.hours}</span>
      </div>
      <nav className="nav">
        <Link href="/" className="brand">Alb Build</Link>
        <div className="nav-links">
          <Link href="/">Kreu</Link>
          <Link href="/portfolio">Portofoli</Link>
          <Link href="/services">Shërbimet</Link>
          <Link href="/contact">Kontakt</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </nav>
    </>
  );
}
