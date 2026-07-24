import { Avatar, Button, Tag } from "antd";
import { TeamOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Room } from "@/app/types/room";

const CATEGORY_LABEL: Record<Room["category"], string> = {
  study: "Study group",
  project: "Project team",
  club: "Club",
  general: "General",
};

export default function RoomCard({ room, onJoin }: { room: Room; onJoin?: (id: string) => void }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 transition-colors"
      style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-start justify-between">
        <Avatar
          shape="square"
          size={44}
          style={{ background: room.color, color: "#14141C", fontWeight: 700, fontFamily: "var(--font-display)" }}
        >
          {room.name[0]}
        </Avatar>
        <Tag style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-secondary)", border: "none" }}>
          {CATEGORY_LABEL[room.category]}
        </Tag>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-1">{room.name}</h3>
        <p className="text-sm line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
          {room.topic}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-text-faint)", fontFamily: "var(--font-mono)" }}>
        <span className="flex items-center gap-1.5">
          <TeamOutlined /> {room.memberCount}
        </span>
        {room.taskTotal > 0 && (
          <span className="flex items-center gap-1.5">
            <CheckCircleOutlined /> {room.taskDone}/{room.taskTotal} tasks
          </span>
        )}
      </div>

      <Button type="default" block onClick={() => onJoin?.(room.id)} style={{ marginTop: 4 }}>
        Join room
      </Button>
    </div>
  );
}
