import { PresenceStatus } from "@/types/user";

const PRESENCE_COLOR: Record<PresenceStatus, string> = {
  online: "#2DD4BF",
  focusing: "#FFB454",
  away: "#9494A6",
  offline: "#4A4A5A",
};

export const PRESENCE_LABEL: Record<PresenceStatus, string> = {
  online: "Online",
  focusing: "Focusing",
  away: "Away",
  offline: "Offline",
};

export default function PresenceDot({
  status,
  size = 10,
}: {
  status: PresenceStatus;
  size?: number;
}) {
  return (
    <span
      className={status === "focusing" ? "presence-focusing" : undefined}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: PRESENCE_COLOR[status],
        border: "2px solid var(--color-bg-surface)",
      }}
      aria-label={PRESENCE_LABEL[status]}
      title={PRESENCE_LABEL[status]}
    />
  );
}
