"use client";

import { Collapse, Tag } from "antd";

const endpoints = [
  {
    key: "auth",
    label: "Auth",
    methods: [
      { verb: "POST", path: "/api/auth/register", desc: "Create an account. Password is hashed with bcrypt before storage." },
      { verb: "POST", path: "/api/auth/login", desc: "Authenticate and start a session." },
      { verb: "POST", path: "/api/auth/logout", desc: "End the current session." },
    ],
  },
  {
    key: "rooms",
    label: "Rooms",
    methods: [
      { verb: "GET", path: "/api/rooms", desc: "List rooms visible to the current user." },
      { verb: "POST", path: "/api/rooms", desc: "Create a room." },
      { verb: "POST", path: "/api/rooms/:id/join", desc: "Join an existing room." },
    ],
  },
  {
    key: "tasks",
    label: "Tasks",
    methods: [
      { verb: "GET", path: "/api/rooms/:id/tasks", desc: "List a room's checklist." },
      { verb: "POST", path: "/api/rooms/:id/tasks", desc: "Add a task to a room." },
      { verb: "PATCH", path: "/api/tasks/:id", desc: "Toggle a task done/not done." },
    ],
  },
];

const verbColor: Record<string, string> = {
  GET: "var(--color-periwinkle)",
  POST: "var(--color-success)",
  PATCH: "var(--color-amber)",
};

export default function DevelopersPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
        Developers
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-text-secondary)" }}>
        LiveChat&rsquo;s backend (YUH) is an Express + mssql API. Routes below
        reflect the current planned shape — the frontend&rsquo;s{" "}
        <code style={{ fontFamily: "var(--font-mono)" }}>app/services/*.ts</code> files
        already call these paths, so wiring up a controller makes it live immediately.
      </p>

      <Collapse
        bordered={false}
        style={{ background: "transparent" }}
        defaultActiveKey={["auth"]}
        items={endpoints.map((group) => ({
          key: group.key,
          label: <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{group.label}</span>,
          style: { background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: 12, marginBottom: 12 },
          children: (
            <div className="flex flex-col gap-3">
              {group.methods.map((m) => (
                <div key={m.path} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <Tag style={{ background: "transparent", border: `1px solid ${verbColor[m.verb]}`, color: verbColor[m.verb], fontFamily: "var(--font-mono)", minWidth: 52, textAlign: "center" }}>
                      {m.verb}
                    </Tag>
                    <code className="text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-primary)" }}>
                      {m.path}
                    </code>
                  </div>
                  <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {m.desc}
                  </span>
                </div>
              ))}
            </div>
          ),
        }))}
      />
    </div>
  );
}
