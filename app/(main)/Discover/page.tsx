"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Segmented, Empty, App as AntdApp } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import RoomCard from "@/components/RoomCard";
import { mockRooms } from "@/lib/mock-data";
import { Room } from "@/types/room";

const FILTERS: { label: string; value: Room["category"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Study", value: "study" },
  { label: "Project", value: "project" },
  { label: "Club", value: "club" },
  { label: "General", value: "general" },
];

export default function DiscoverPage() {
  const router = useRouter();
  const { message } = AntdApp.useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Room["category"] | "all">("all");

  const rooms = useMemo(() => {
    return mockRooms.filter((r) => {
      const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase()) || r.topic.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || r.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
        Discover rooms
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)" }}>
        Public study groups and project teams you can join right now.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Input
          size="large"
          prefix={<SearchOutlined style={{ color: "var(--color-text-faint)" }} />}
          placeholder="Search rooms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 360 }}
        />
        <Segmented
          size="large"
          options={FILTERS.map((f) => ({ label: f.label, value: f.value }))}
          value={category}
          onChange={(v) => setCategory(v as Room["category"] | "all")}
        />
      </div>

      {rooms.length === 0 ? (
        <Empty description="No rooms match that search" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onJoin={(id) => {
                message.success(`Joined ${room.name}`);
                router.push(`/rooms/${id}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
