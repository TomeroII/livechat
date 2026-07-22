import ChatHeader from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      <header />
      <main className="flex-1">{children}</main>
      <footer />
    </section>
  );
}
