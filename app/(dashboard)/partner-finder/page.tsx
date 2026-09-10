import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Go Together — SAFAR",
  description: "Shared travel, better journeys. Coming soon to SAFAR.",
};

export default function PartnerFinderPage() {
  return (
    <div className="safar-placeholder-page">
      {/* Top Header */}
      <header className="safar-placeholder-nav">
        <Link href="/" className="safar-placeholder-brand">
          <Image
            src="/safar-logo.jpeg"
            alt="SAFAR logo"
            width={34}
            height={34}
            className="safar-placeholder-brand-logo"
            priority
          />
          <span className="safar-placeholder-brand-name">SAFAR</span>
        </Link>
        <Link href="/" className="safar-placeholder-back-link">
          ← Back to SAFAR
        </Link>
      </header>

      {/* Centered Banner / Card */}
      <main className="safar-placeholder-body">
        <section className="safar-placeholder-card" aria-label="Go Together Coming Soon">
          <div className="safar-placeholder-top-accent" />

          <span className="safar-placeholder-status-badge">
            <span className="safar-pulse-dot-orange" />
            COMING SOON
          </span>

          <div className="safar-placeholder-icon-circle">
            🤝
          </div>

          <h1 className="safar-placeholder-heading">Go Together</h1>

          <p className="safar-placeholder-subheading">
            Shared travel, better journeys.
          </p>

          <p className="safar-placeholder-desc">
            We&apos;re building a smarter way for travellers heading the same way to discover and travel together.
          </p>

          <div className="safar-placeholder-cta-row">
            <Link href="/" className="safar-placeholder-btn-primary">
              ← Back to SAFAR
            </Link>
          </div>
        </section>
      </main>

      <footer className="safar-placeholder-footer">
        © {new Date().getFullYear()} SAFAR • Travel Fair. Go Together. Stay Safe.
      </footer>
    </div>
  );
}
