import { Empty } from "antd";

export default function RoomsIndexPage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span style={{ color: "var(--color-text-secondary)" }}>
            Pick a room or a conversation to start chatting
          </span>
        }
      />
    </div>
  );
}
