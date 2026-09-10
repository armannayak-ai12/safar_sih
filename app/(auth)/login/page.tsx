import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="auth-brand" href="/">
          <Image src="/safar-logo.jpeg" alt="SAFAR logo" width={48} height={48} priority />
          SAFAR
        </Link>
        <div className="auth-copy">
          <p className="auth-kicker">WELCOME TO SAFAR</p>
          <h1>Ready to<br /><em>explore?</em></h1>
          <p>Sign in to plan smarter, travel fair, and keep every journey in one place.</p>
        </div>
        <div className="auth-actions">
          <button className="google-button" type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.8 12.23c0-.71-.06-1.2-.2-1.72H12v3.55h5.64c-.11.88-.7 2.2-2.02 3.09l-.02.12 2.94 2.28.2.02c1.86-1.72 3.06-4.25 3.06-7.34Z"/><path fill="#34A853" d="M12 22c2.76 0 5.07-.91 6.76-2.48l-3.12-2.42c-.84.58-1.96.98-3.64.98-2.7 0-5-1.78-5.82-4.24l-.11.01-3.06 2.37-.04.11A10.2 10.2 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.18 13.84A6.13 6.13 0 0 1 5.86 12c0-.64.12-1.26.31-1.84l-.01-.12-3.1-2.4-.1.05A10 10 0 0 0 1.8 12c0 1.62.39 3.16 1.16 4.31l3.22-2.47Z"/><path fill="#EA4335" d="M12 5.91c2.12 0 3.55.92 4.37 1.68l3.19-3.11C17.56 2.61 14.76 1.5 12 1.5a10.2 10.2 0 0 0-9.03 5.55l3.22 2.48C7 7.69 9.3 5.91 12 5.91Z"/></svg>
            Continue with Google
          </button>
        </div>
        <p className="auth-terms">By continuing, you agree to SAFAR&apos;s <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
      </section>
    </main>
  );
}
