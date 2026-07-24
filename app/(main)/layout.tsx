import RoomRail from "@/components/RoomRail";
import RoomSidebar from "@/components/RoomSidebar";

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <RoomRail />
      <RoomSidebar />
      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </div>
  );
}
