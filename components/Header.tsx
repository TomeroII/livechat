"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import link from "next/link";

const navigation = [
  { name: "Career", href: "/career" },
  { name: "Developers", href: "/developers" },
  { name: "Discover", href: "/discover" },
  { name: "Download", href: "/download" },
  { name: "Login", href: "/login" },
  { name: "Rooms", href: "/rooms" },
  { name: "Safety", href: "/safety" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">test</h1>


    </header>
  )
}