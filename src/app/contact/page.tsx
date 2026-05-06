import { Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contact, contactResponse, quoteChecklist } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <span className="eyebrow">Contact</span>
          <h1>Send the site details and get a practical reply.</h1>
          <p>
            Share what needs to be built, repaired, extended, or measured. Photos and dimensions help the first estimate.
          </p>
        </section>
        <section className="section contact-grid">
          <div>
            <h2>Project request</h2>
            <p className="muted">
              Include location, approximate dimensions, current site condition, and photos or drawings if available.
            </p>
            <ul className="check-list">
              {quoteChecklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="contact-panel">
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`}><Phone size={18} /> {contact.phone}</a>
            <a href={`mailto:${contact.email}`}><Mail size={18} /> {contact.email}</a>
            <span><MapPin size={18} /> {contact.location}</span>
            <span>{contact.hours}</span>
          </div>
        </section>
        <section className="section white compact-section">
          <div className="section-head">
            <h2>What happens next</h2>
            <p>A simple response flow so the client knows what information is needed before pricing.</p>
          </div>
          <div className="two-column-list">
            {contactResponse.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
