"use client";

import Link from "next/link";
import { Button, Avatar, Tag } from "antd";
import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";

const previewMessages = [
  { name: "Minh Anh", color: "#FFB454", text: "pushed the RoomCard component, can someone review?" },
  { name: "Duy Khang", color: "#2DD4BF", text: "on it, looking now" },
  { name: "Thao Vy", color: "#FF6B6B", text: "bcrypt salt rounds — 10 or 12?" },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-16 items-center py-20 lg:py-28">
        <div>
          <span
            className="inline-block text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-6"
            style={{
              color: "var(--color-amber)",
              background: "rgba(255, 180, 84, 0.12)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Now in beta my nigga check it out yurrrr
          </span>
          <h1
            className="text-5xl sm:text-6xl leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            Chat with your team.
            <br />
            Track the work.
            <br />
            <span style={{ color: "var(--color-amber)" }}>One room.</span>
          </h1>
          <p className="text-lg mb-9 max-w-md" style={{ color: "var(--color-text-secondary)" }}>
            LiveChat pairs a real-time group chat with a shared task list per
            room, so the conversation and the checklist never drift apart.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/login?mode=register">
              <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPosition="end">
                Create a room
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="large" style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-primary)" }}>
                Browse rooms
              </Button>
            </Link>
          </div>
        </div>

        {/* Product mock — the signature element */}
        <div className="relative">
          <div
            className="absolute -inset-8 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,180,84,0.16), transparent 70%)",
              filter: "blur(20px)",
            }}
            aria-hidden
          />
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
          >
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  StudyHub Capstone
                </p>
                <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
                  4 members
                </p>
              </div>
              <Tag
                style={{
                  background: "rgba(255, 180, 84, 0.14)",
                  color: "var(--color-amber)",
                  border: "none",
                  fontFamily: "var(--font-mono)",
                }}
              >
                3/7 tasks · due tonight
              </Tag>
            </div>

            <div className="px-5 py-5 flex flex-col gap-4">
              {previewMessages.map((m) => (
                <div key={m.name} className="flex gap-3">
                  <Avatar size={32} style={{ background: m.color, color: "#14141C", fontWeight: 700, flexShrink: 0 }}>
                    {m.name[0]}
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 flex items-center gap-2" style={{ borderTop: "1px solid var(--color-border)" }}>
              <CheckCircleFilled style={{ color: "var(--color-success)" }} />
              <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Write auth.controller.js — done
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="grid sm:grid-cols-3 gap-8 py-16" style={{ borderTop: "1px solid var(--color-border)" }}>
        {[
          { title: "Rooms, not servers", body: "One room per team or study group — chat and tasks live together, not in separate tabs." },
          { title: "Presence that means something", body: "Online, Focusing, Away, Offline — know who's actually reachable right now." },
          { title: "Reply, react, search", body: "Targeted replies, message reactions, and full history search, built in from day one." },
        ].map((f) => (
          <div key={f.title}>
            <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
              {f.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              {f.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
