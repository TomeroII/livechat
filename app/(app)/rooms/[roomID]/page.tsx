import { notFound } from "next/navigation";
import RoomView from "@/components/RoomView";
import { getRoom, listMessages } from "@/services/room.service";
import { listTasks } from "@/services/task.service";
import { getUser, listUsers } from "@/services/user.service";
import { Room } from "@/types/room";

// All of these hit `optionalAuth` routes on the backend, so this stays a
// plain server-side fetch — no cookies need to be forwarded here. Only
// the mutations (send message, toggle task, join room) need the logged-in
// user's cookie, and those happen client-side where the browser attaches
// it automatically.

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomID: string }>;
}) {
  const { roomID } = await params;

  if (roomID.startsWith("dm-")) {
    const userId = roomID.slice(3);
    let dmPartner;
    try {
      dmPartner = await getUser(userId);
    } catch {
      notFound();
    }

    const users = await listUsers().catch(() => []);

    const dmRoom: Room = {
      id: roomID,
      name: dmPartner!.name,
      topic: "Direct message",
      category: "general",
      color: dmPartner!.avatarColor,
      memberCount: 2,
      unreadCount: 0,
      taskTotal: 0,
      taskDone: 0,
    };

    // TODO: replace with a real 1:1 message history once the backend
    // supports DMs — for now this renders empty and ready to type into.
    return <RoomView room={dmRoom} tasks={[]} messages={[]} users={users} />;
  }

  let room: Room;
  try {
    room = await getRoom(roomID);
  } catch (err) {
    const status = (err as { response?: { status?: number } })?.response?.status;
    if (status === 404) notFound();
    return <BackendUnreachable />;
  }

  const [tasks, messages, users] = await Promise.all([
    listTasks(roomID).catch(() => []),
    listMessages(roomID).catch(() => []),
    listUsers().catch(() => []),
  ]);

  return <RoomView room={room} tasks={tasks} messages={messages} users={users} />;
}

function BackendUnreachable() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <p className="text-sm font-semibold mb-1">Can&apos;t reach the backend</p>
        <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
          Make sure the YUH server is running on the port set in
          NEXT_PUBLIC_API_URL, then reload.
        </p>
      </div>
    </div>
  );
}
