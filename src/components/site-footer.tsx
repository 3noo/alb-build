import Link from "next/link";
import { contact } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="footer">
      <span>Alb Build Steel Construction</span>
      <span>{contact.phone} · {contact.email}</span>
      <Link href="/contact">Request a quote</Link>
    </footer>
  );
}
