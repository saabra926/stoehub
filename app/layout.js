import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { SiteActions } from "@/components/site-actions/site-actions";
import { AppProviders } from "@/components/providers";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "StepHub",
  description: "Comfortable sneakers and street-ready footwear.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
      </head>
      <body>
        <AppProviders>
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
          <SiteActions />
        </AppProviders>
      </body>
    </html>
  );
}
