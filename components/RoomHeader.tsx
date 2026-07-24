"use client";

import { Avatar, Badge, Tooltip, Button } from "antd";
import { BellOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { mockUsers } from "@/lib/mock-data";

export default function RoomHeader({
  title,
  subtitle,
  showTaskToggle,
  taskPanelOpen,
  onToggleTasks,
}: {
  title: string;
  subtitle: string;
  showTaskToggle?: boolean;
  taskPanelOpen?: boolean;
  onToggleTasks?: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 h-14 shrink-0"
      style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-surface)" }}
    >
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold truncate">{title}</h2>
        <p className="text-xs truncate" style={{ color: "var(--color-text-faint)" }}>
          {subtitle}
        </p>
      </div>

      <div className="hidden sm:flex items-center -space-x-2 mr-1">
        {mockUsers.slice(0, 4).map((u) => (
          <Tooltip key={u.id} title={u.name}>
            <Avatar
              size={26}
              style={{ background: u.avatarColor, color: "#14141C", fontWeight: 700, border: "2px solid var(--color-bg-surface)" }}
            >
              {u.name[0]}
            </Avatar>
          </Tooltip>
        ))}
      </div>

      <Tooltip title="Notifications">
        <Badge dot color="var(--color-amber)" offset={[-3, 3]}>
          <Button type="text" shape="circle" icon={<BellOutlined style={{ color: "var(--color-text-secondary)" }} />} />
        </Badge>
      </Tooltip>

      {showTaskToggle && (
        <Tooltip title="Tasks">
          <Button
            type="text"
            shape="circle"
            onClick={onToggleTasks}
            icon={
              <CheckSquareOutlined
                style={{ color: taskPanelOpen ? "var(--color-amber)" : "var(--color-text-secondary)" }}
              />
            }
          />
        </Tooltip>
      )}
    </div>
  );
}
