import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vennova — Clinic Management Platform",
  description: "The all-in-one clinic management platform connecting doctors, patients, and staff in real time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
