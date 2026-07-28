"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Tooltip, Button } from "antd";
import { MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { mockRooms } from "@/lib/mock-data";

export default function RoomRail() {
  const pathname = usePathname();
  const onDMs = pathname === "/livechat/app/(main)/roomID/page.tsx" || pathname === "/livechat/app/(main)/roomID/page.tsx";

  return (
    <nav
      className="hidden sm:flex flex-col items-center gap-3 py-4 shrink-0"
      style={{ width: 72, background: "var(--color-bg-base)", borderRight: "1px solid var(--color-border)" }}
    >
      <Tooltip title="Direct messages" placement="right">
        <Link href="/rooms">
          <RailButton active={onDMs}>
            <MessageOutlined style={{ fontSize: 18 }} />
          </RailButton>
        </Link>
      </Tooltip>

      <div style={{ width: 32, height: 1, background: "var(--color-border)" }} />

      <div className="flex flex-col gap-2 thin-scroll overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
        {mockRooms.map((room) => {
          const active = pathname === `/rooms/${room.id}`;
          return (
            <Tooltip key={room.id} title={room.name} placement="right">
              <Link href={`/livechat/app/(app)/rooms/[roomID]/page.tsx${room.id}`}>
                <RailButton active={active}>
                  <Avatar
                    shape="square"
                    size={40}
                    style={{ background: room.color, color: "#14141C", fontWeight: 700, fontFamily: "var(--font-display)" }}
                  >
                    {room.name[0]}
                  </Avatar>
                </RailButton>
              </Link>
            </Tooltip>
          );
        })}
      </div>

      <Tooltip title="Create a room" placement="right">
        <Button
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          style={{ background: "var(--color-bg-elevated)", color: "var(--color-amber)", border: "none" }}
        />
      </Tooltip>
    </nav>
  );
}

function RailButton({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center transition-all"
      style={{
        width: 48,
        height: 48,
        borderRadius: active ? 14 : 24,
        background: active ? "var(--color-bg-elevated)" : "transparent",
        color: active ? "var(--color-amber)" : "var(--color-text-secondary)",
        boxShadow: active ? "inset 0 0 0 1px var(--color-border)" : "none",
      }}
    >
      {children}
    </div>
  );
}
