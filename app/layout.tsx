import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source",
});

export const metadata: Metadata = {
  title: {
    default: "Sadhana Arts | Preserving a Living Tradition",
    template: "%s | Sadhana Arts",
  },
  description:
    "Sadhana Arts is a UK-based cultural organisation dedicated to preserving, developing and promoting Indian classical music through education, live performance and Parampara.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cormorant.variable} ${sourceSans.variable} font-sans bg-warm-white text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
