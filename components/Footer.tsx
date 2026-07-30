import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { name: "Discover rooms", href: "/discover" },
      { name: "Download", href: "/download" },
      { name: "Developers", href: "/developers" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Safety", href: "/safety" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-bg-surface)", borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 sm:grid-cols-4 gap-10">
        <div className="col-span-2 sm:col-span-1">
          <span
            className="text-xl italic"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-amber)", fontWeight: 600 }}
          >
            Live
          </span>
          <span className="text-xl" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Chat
          </span>
          <p className="mt-3 text-sm max-w-[26ch]" style={{ color: "var(--color-text-secondary)" }}>
            Chat with your team. Track the work. One room.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs uppercase tracking-wider mb-4" style={{ color: "var(--color-text-faint)" }}>
              {col.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        <p
          className="max-w-7xl mx-auto px-6 py-6 text-xs"
          style={{ color: "var(--color-text-faint)", fontFamily: "var(--font-mono)" }}
        >
          © 2026 LiveChat. Built by Minh Giang.
        </p>
      </div>
    </footer>
  );
}
