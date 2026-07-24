import { Progress } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Room } from "@/types/room";

export default function FocusBar({ room }: { room: Room }) {
  if (room.taskTotal === 0) return null;
  const pct = Math.round((room.taskDone / room.taskTotal) * 100);

  return (
    <div
      className="flex items-center gap-3 px-5 py-2 shrink-0"
      style={{ background: "var(--color-bg-elevated)", borderBottom: "1px solid var(--color-border)" }}
    >
      <CheckCircleOutlined style={{ color: "var(--color-amber)", fontSize: 13 }} />
      <span className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
        {room.taskDone}/{room.taskTotal} tasks done
        {room.nextDueLabel && <> · next due {room.nextDueLabel}</>}
      </span>
      <Progress
        percent={pct}
        showInfo={false}
        strokeColor="var(--color-amber)"
        trailColor="var(--color-border)"
        size="small"
        style={{ maxWidth: 160, marginLeft: "auto" }}
      />
    </div>
  );
}
