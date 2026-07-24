"use client";

import { useState } from "react";
import { Avatar, Tooltip } from "antd";
import { CheckOutlined, SmileOutlined, RollbackOutlined } from "@ant-design/icons";
import { Message, DeliveryState } from "@/types/message";
import { User } from "@/types/user";
import { getMessageById, getUserById } from "@/lib/mock-data";

const QUICK_REACTIONS = ["👍", "❤️", "😂", "👀", "🎉"];

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function DeliveryTicks({ state }: { state: DeliveryState }) {
  const color = state === "seen" ? "var(--color-periwinkle)" : "var(--color-text-faint)";
  return (
    <span className="inline-flex" style={{ color }} aria-label={state}>
      <CheckOutlined style={{ fontSize: 11 }} />
      {state !== "sent" && <CheckOutlined style={{ fontSize: 11, marginLeft: -6 }} />}
    </span>
  );
}

export default function MessageBubble({
  message,
  author,
  showHeader,
  isOwn,
  onReply,
  onReact,
}: {
  message: Message;
  author: User | undefined;
  showHeader: boolean;
  isOwn: boolean;
  onReply: (message: Message) => void;
  onReact: (messageId: string, emoji: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const replyTo = message.replyToId ? getMessageById(message.replyToId) : undefined;
  const replyAuthor = replyTo ? getUserById(replyTo.authorId) : undefined;

  return (
    <div
      className="group relative flex gap-3 px-5 py-0.5 hover:bg-[var(--color-bg-elevated)] rounded-lg"
      style={{ marginTop: showHeader ? 14 : 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPickerOpen(false);
      }}
    >
      <div style={{ width: 36, flexShrink: 0 }}>
        {showHeader && author && (
          <Avatar size={36} style={{ background: author.avatarColor, color: "#14141C", fontWeight: 700 }}>
            {author.name[0]}
          </Avatar>
        )}
      </div>

      <div className="flex-1 min-w-0 py-0.5">
        {replyTo && (
          <div
            className="flex items-center gap-1.5 mb-1 pl-2 text-xs"
            style={{ borderLeft: "2px solid var(--color-border)", color: "var(--color-text-faint)" }}
          >
            <RollbackOutlined style={{ fontSize: 10 }} />
            <span style={{ fontWeight: 600 }}>{replyAuthor?.name ?? "someone"}</span>
            <span className="truncate max-w-[32ch]">{replyTo.content}</span>
          </div>
        )}

        {showHeader && (
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">{author?.name ?? "Unknown"}</span>
            <span className="text-xs" style={{ color: "var(--color-text-faint)", fontFamily: "var(--font-mono)" }}>
              {formatTime(message.createdAt)}
            </span>
          </div>
        )}

        <div className="flex items-end gap-2">
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
            {message.content}
          </p>
          {isOwn && message.delivery && (
            <Tooltip title={message.delivery}>
              <span className="pb-0.5">
                <DeliveryTicks state={message.delivery} />
              </span>
            </Tooltip>
          )}
        </div>

        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {message.reactions.map((r) => (
              <button
                key={r.emoji}
                onClick={() => onReact(message.id, r.emoji)}
                className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
                style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)" }}
              >
                <span>{r.emoji}</span>
                <span style={{ color: "var(--color-text-secondary)" }}>{r.userIds.length}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {hovered && (
        <div
          className="absolute -top-3 right-4 flex items-center gap-0.5 px-1 py-1 rounded-lg z-10"
          style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)" }}
        >
          <div className="relative">
            <button
              onClick={() => setPickerOpen((v) => !v)}
              className="flex items-center justify-center cursor-pointer"
              style={{ width: 28, height: 28, color: "var(--color-text-secondary)" }}
              aria-label="Add reaction"
            >
              <SmileOutlined />
            </button>
            {pickerOpen && (
              <div
                className="absolute top-full right-0 mt-1 flex gap-1 px-2 py-1.5 rounded-lg z-20"
                style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)" }}
              >
                {QUICK_REACTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onReact(message.id, emoji);
                      setPickerOpen(false);
                    }}
                    className="text-base cursor-pointer hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => onReply(message)}
            className="flex items-center justify-center cursor-pointer"
            style={{ width: 28, height: 28, color: "var(--color-text-secondary)" }}
            aria-label="Reply"
          >
            <RollbackOutlined />
          </button>
        </div>
      )}
    </div>
  );
}
