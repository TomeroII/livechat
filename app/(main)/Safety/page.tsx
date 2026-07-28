import { Collapse } from "antd";

const sections = [
  {
    key: "guidelines",
    label: "Community guidelines",
    body: "Be respectful, keep rooms on-topic, and don't share anything you wouldn't want a classmate or teammate to see. Room admins can remove members who don't follow this.",
  },
  {
    key: "reporting",
    label: "Reporting a problem",
    body: "Every message will have a report option once moderation tools ship. Until then, room admins can remove members directly.",
  },
  {
    key: "privacy",
    label: "Privacy",
    body: "Passwords are hashed with bcrypt and never stored in plain text. Messages are only visible to members of the room they're posted in.",
  },
];

export default function SafetyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
        Safety
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--color-text-secondary)" }}>
        How LiveChat keeps rooms usable for everyone in them.
      </p>

      <Collapse
        bordered={false}
        style={{ background: "transparent" }}
        items={sections.map((s) => ({
          key: s.key,
          label: <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{s.label}</span>,
          style: { background: "var(--color-bg-surface)", border: "1px solid var(--color-border)", borderRadius: 12, marginBottom: 12 },
          children: (
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              {s.body}
            </p>
          ),
        }))}
      />
    </div>
  );
}
