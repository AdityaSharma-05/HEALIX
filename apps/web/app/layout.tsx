import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healix | Find trusted clinics in Moradabad",
  description:
    "Discover verified clinics and doctors in Moradabad and request an appointment."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
