"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input, Avatar, Badge } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PresenceDot from "./PresenceDot";
import UserBar from "./UserBar";
import { mockRooms, mockUsers, currentUser } from "@/lib/mock-data";

export default function RoomSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const dmUsers = mockUsers.filter((u) => u.id !== currentUser.id);

  const filteredRooms = useMemo(
    () => mockRooms.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const filteredDMs = useMemo(
    () => dmUsers.filter((u) => u.name.toLowerCase().includes(query.toLowerCase())),
    [query, dmUsers]
  );

  return (
    <div
      className="flex flex-col shrink-0 h-full"
      style={{ width: 280, background: "var(--color-bg-surface)", borderRight: "1px solid var(--color-border)" }}
    >
      <div className="p-3">
        <Input
          size="middle"
          prefix={<SearchOutlined style={{ color: "var(--color-text-faint)" }} />}
          placeholder="Find a room or a person"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto thin-scroll px-2 pb-2">
        <SectionLabel>Direct messages</SectionLabel>
        <div className="flex flex-col gap-0.5 mb-4">
          {filteredDMs.map((u) => (
            <Link key={u.id} href={`/rooms/dm-${u.id}`}>
              <Row active={pathname === `/rooms/dm-${u.id}`}>
                <span className="relative shrink-0">
                  <Avatar size={30} style={{ background: u.avatarColor, color: "#14141C", fontWeight: 700 }}>
                    {u.name[0]}
                  </Avatar>
                  <span className="absolute -bottom-0.5 -right-0.5">
                    <PresenceDot status={u.presence} size={9} />
                  </span>
                </span>
                <span className="text-sm truncate">{u.name}</span>
              </Row>
            </Link>
          ))}
        </div>

        <SectionLabel>Rooms</SectionLabel>
        <div className="flex flex-col gap-0.5">
          {filteredRooms.map((room) => (
            <Link key={room.id} href={`/livechat/app/(app)/rooms/[roomID]/page.tsx${room.id}`}>
              <Row active={pathname === `/livechat/app/(app)/rooms/[roomID]/page.tsx${room.id}`}>
                <Avatar
                  shape="square"
                  size={30}
                  style={{ background: room.color, color: "#14141C", fontWeight: 700, fontFamily: "var(--font-display)", flexShrink: 0 }}
                >
                  {room.name[0]}
                </Avatar>
                <span className="text-sm truncate flex-1">{room.name}</span>
                {room.unreadCount > 0 && <Badge count={room.unreadCount} color="var(--color-amber)" />}
              </Row>
            </Link>
          ))}
        </div>
      </div>

      <UserBar />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-wider px-2 pt-3 pb-2"
      style={{ color: "var(--color-text-faint)", fontFamily: "var(--font-mono)" }}
    >
      {children}
    </p>
  );
}

function Row({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors cursor-pointer"
      style={{
        background: active ? "var(--color-bg-elevated)" : "transparent",
        color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
      }}
    >
      {children}
    </div>
  );
}
