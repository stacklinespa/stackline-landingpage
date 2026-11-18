import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stackline.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Stackline — Estudio de software a la medida",
    template: "%s | Stackline",
  },
  description:
    "Somos Stackline, una empresa joven de software en Chile dedicada a crear sistemas empresariales internos y aplicaciones web a la medida para cada requerimiento.",
  keywords: [
    "software a medida",
    "estudio de software Chile",
    "sistemas empresariales a medida",
    "ERP a medida",
    "aplicaciones web personalizadas",
    "plataformas SaaS",
    "Stackline",
  ],
  authors: [{ name: "Stackline SpA" }],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteUrl,
    siteName: "Stackline",
    title: "Stackline — Construimos software hecho a tu medida",
    description:
      "Empresa joven de desarrollo de software a medida en Chile: sistemas empresariales internos y plataformas web creadas desde cero para cada requerimiento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackline — Estudio de software a la medida",
    description:
      "Sistemas empresariales internos y aplicaciones web diseñadas desde cero para tu operación.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-[100dvh] bg-canvas font-sans text-navy antialiased">
        <div aria-hidden="true" className="studio-grain" />
        {children}
      </body>
    </html>
  );
}
