// Remove the { } from around ThemeProtector
import ThemeProtector from "@/components/theme-protector";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ThemeProtector />
        {children}
      </body>
    </html>
  );
}