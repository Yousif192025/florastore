import type { Metadata } from "next";
import { Cairo, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { QueryProvider } from "@/components/shared/query-provider";
import { Toaster } from "sonner";
import "@/styles/globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "فلورا ستور | Flora Store",
    template: "%s | فلورا ستور",
  },
  description: "متجر فلورا — إكسسوارات، ورود، هدايا، وعطور فاخرة. YOUR STYLE, YOUR STORY",
  keywords: ["فلورا", "flora", "إكسسوارات", "هدايا", "ورود", "عطور", "ساعات", "شنط"],
  authors: [{ name: "Flora Store" }],
  creator: "Flora Store",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    title: "فلورا ستور | Flora Store",
    description: "متجر فلورا — إكسسوارات، ورود، هدايا، وعطور فاخرة",
    siteName: "Flora Store",
    images: [{ url: "/logos/flora-og.png", width: 1200, height: 630, alt: "Flora Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "فلورا ستور | Flora Store",
    description: "متجر فلورا — إكسسوارات، ورود، هدايا، وعطور فاخرة",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster
              position="top-center"
              richColors
              toastOptions={{
                style: { fontFamily: "Cairo, sans-serif", direction: "rtl" },
              }}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
