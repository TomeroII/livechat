"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import link from "next/link";

const navigation = [
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
  { name: "placeholder", href: "/placeholder" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold">My App</h1>


    </header>
  )
}