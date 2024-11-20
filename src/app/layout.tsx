"use client";
import { SessionProvider } from "next-auth/react";
import { WattecoAuthProvider } from "../app/contexts/WattecoAuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider>
          <WattecoAuthProvider>
            <Header />
            {children}
            <Footer />
          </WattecoAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
