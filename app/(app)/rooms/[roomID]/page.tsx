import { notFound } from "next/navigation";
import RoomView from "@/components/RoomView";
import { getRoomById, getUserById, getTasksByRoom, getMessagesByRoom } from "@/lib/mock-data";
import { Room } from "@/types/room";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  if (roomId.startsWith("dm-")) {
    const userId = roomId.slice(3);
    const user = getUserById(userId);
    if (!user) notFound();

    const dmRoom: Room = {
      id: roomId,
      name: user.name,
      topic: "Direct message",
      category: "general",
      color: user.avatarColor,
      memberCount: 2,
      unreadCount: 0,
      taskTotal: 0,
      taskDone: 0,
    };

    // TODO: replace with a real 1:1 message history once the backend
    // supports DMs — for now this renders empty and ready to type into.
    return <RoomView room={dmRoom} tasks={[]} messages={[]} />;
  }

  const room = getRoomById(roomId);
  if (!room) notFound();

  return <RoomView room={room} tasks={getTasksByRoom(roomId)} messages={getMessagesByRoom(roomId)} />;
}
