"use client";

import { useState } from "react";
import { Drawer } from "antd";
import RoomHeader from "./RoomHeader";
import FocusBar from "./FocusBar";
import ChatBox from "./ChatBox";
import TaskList from "./TaskList";
import { Room } from "@/types/room";
import { Task } from "@/types/task";
import { Message } from "@/types/message";

export default function RoomView({
  room,
  tasks,
  messages,
}: {
  room: Room;
  tasks: Task[];
  messages: Message[];
}) {
  const [taskPanelOpen, setTaskPanelOpen] = useState(false);
  const hasTasks = room.taskTotal > 0 || tasks.length > 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      <RoomHeader
        title={room.name}
        subtitle={`${room.topic} · ${room.memberCount} members`}
        showTaskToggle={hasTasks}
        taskPanelOpen={taskPanelOpen}
        onToggleTasks={() => setTaskPanelOpen((v) => !v)}
      />
      <FocusBar room={room} />

      <div className="flex flex-1 min-h-0">
        <ChatBox key={room.id} roomId={room.id} initialMessages={messages} />

        {hasTasks && (
          <>
            <div className="hidden lg:block" style={{ borderLeft: "1px solid var(--color-border)" }}>
              <TaskList key={room.id} roomId={room.id} initialTasks={tasks} />
            </div>
            <Drawer
              title="Tasks"
              placement="right"
              width={300}
              open={taskPanelOpen}
              onClose={() => setTaskPanelOpen(false)}
              closable
              className="lg:hidden"
              styles={{ body: { padding: 0 } }}
            >
              <TaskList key={room.id} roomId={room.id} initialTasks={tasks} />
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
}
