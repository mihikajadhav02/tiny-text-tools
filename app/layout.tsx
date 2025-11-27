import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-courier-prime',
  display: 'swap', // Optimize font loading
  preload: true, // Preload font files for better performance
});

export const metadata: Metadata = {
  title: "Tiny Text Tools",
  description: "5 tiny utilities to clean and transform your text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${courierPrime.variable} font-typewriter antialiased`}>
        {children}
      </body>
    </html>
  );
}
