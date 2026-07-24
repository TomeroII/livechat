"use client";

import { Avatar, Dropdown, Badge } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import PresenceDot, { PRESENCE_LABEL } from "./PresenceDot";
import ThemeToggle from "./ThemeToggle";
import { currentUser } from "@/lib/mock-data";
import { PresenceStatus } from "@/types/user";

const PRESENCE_OPTIONS: PresenceStatus[] = ["online", "focusing", "away", "offline"];

export default function UserBar() {
  const [presence, setPresence] = useState<PresenceStatus>(currentUser.presence);

  return (
    <div
      className="flex items-center gap-2 px-3 py-3 shrink-0"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-surface)" }}
    >
      <Dropdown
        trigger={["click"]}
        menu={{
          items: PRESENCE_OPTIONS.map((status) => ({
            key: status,
            label: (
              <span className="flex items-center gap-2">
                <PresenceDot status={status} size={8} /> {PRESENCE_LABEL[status]}
              </span>
            ),
            onClick: () => setPresence(status),
          })),
        }}
      >
        <div className="cursor-pointer">
          <Badge dot={false} offset={[-4, 32]}>
            <Avatar
              size={36}
              style={{ background: currentUser.avatarColor, color: "#14141C", fontWeight: 700 }}
            >
              {currentUser.name[0]}
            </Avatar>
          </Badge>
        </div>
      </Dropdown>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{currentUser.name}</p>
        <p className="text-xs flex items-center gap-1.5 truncate" style={{ color: "var(--color-text-faint)" }}>
          <PresenceDot status={presence} size={7} />
          {PRESENCE_LABEL[presence]}
        </p>
      </div>

      <ThemeToggle compact />
      <SettingOutlined style={{ color: "var(--color-text-faint)", fontSize: 15, cursor: "pointer" }} />
    </div>
  );
}
