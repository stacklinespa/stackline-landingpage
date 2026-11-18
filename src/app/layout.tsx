import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
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
    default: "Stackline — Software empresarial y aplicaciones web a la medida",
    template: "%s | Stackline",
  },
  description:
    "Somos una empresa joven de ingeniería en Chile dedicada a crear sistemas empresariales internos y aplicaciones web personalizadas para cada requerimiento.",
  keywords: [
    "software a medida",
    "desarrollo de software Chile",
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
    title: "Stackline — Software que calza con tu operación, no al revés",
    description:
      "Empresa joven de desarrollo de software a medida: sistemas empresariales internos, plataformas web y SaaS construidos para cada requerimiento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stackline — Software empresarial y web a la medida",
    description:
      "Sistemas internos y aplicaciones web personalizadas diseñadas para tu operación real.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F9FB",
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
      className={`${bricolage.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-[100dvh] bg-canvas font-sans text-navy antialiased">
        {children}
      </body>
    </html>
  );
}
