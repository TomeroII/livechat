"use client";

import { useEffect, useRef, useState } from "react";
import { Input, Button, Tooltip } from "antd";
import { SendOutlined, SearchOutlined, CloseOutlined, SmileOutlined, PaperClipOutlined } from "@ant-design/icons";
import MessageBubble from "./MessageBubble";
import { Message } from "@/app/types/message";
import { getUserById, currentUser } from "@/lib/mock-data";

const { TextArea } = Input;

export default function ChatBox({
  roomId,
  initialMessages,
}: {
  roomId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages.length]);

  function send() {
    const content = draft.trim();
    if (!content) return;
    const next: Message = {
      id: `local-${Date.now()}`,
      roomId,
      authorId: currentUser.id,
      content,
      createdAt: new Date().toISOString(),
      replyToId: replyTo?.id,
      delivery: "sent",
    };
    setMessages((prev) => [...prev, next]);
    setDraft("");
    setReplyTo(null);
    // TODO: replace with getSocket().emit("message:send", { roomId, content, replyToId })
  }

  function react(messageId: string, emoji: string) {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        const reactions = m.reactions ?? [];
        const existing = reactions.find((r) => r.emoji === emoji);
        if (existing) {
          const already = existing.userIds.includes(currentUser.id);
          const userIds = already
            ? existing.userIds.filter((id) => id !== currentUser.id)
            : [...existing.userIds, currentUser.id];
          const updated = reactions
            .map((r) => (r.emoji === emoji ? { ...r, userIds } : r))
            .filter((r) => r.userIds.length > 0);
          return { ...m, reactions: updated };
        }
        return { ...m, reactions: [...reactions, { emoji, userIds: [currentUser.id] }] };
      })
    );
  }

  const visibleMessages = searchQuery
    ? messages.filter((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div
        className="flex items-center justify-end px-4 py-1.5 shrink-0"
        style={{ borderBottom: searchOpen ? "1px solid var(--color-border)" : "none" }}
      >
        {searchOpen ? (
          <div className="flex items-center gap-2 w-full">
            <Input
              autoFocus
              size="small"
              prefix={<SearchOutlined style={{ color: "var(--color-text-faint)" }} />}
              placeholder="Search this room's messages…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ maxWidth: 320 }}
            />
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
            />
          </div>
        ) : (
          <Tooltip title="Search messages">
            <Button
              type="text"
              size="small"
              icon={<SearchOutlined style={{ color: "var(--color-text-faint)" }} />}
              onClick={() => setSearchOpen(true)}
            />
          </Tooltip>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto thin-scroll py-2">
        {visibleMessages.length === 0 ? (
          <p className="text-center text-sm mt-8" style={{ color: "var(--color-text-faint)" }}>
            No messages match &ldquo;{searchQuery}&rdquo;
          </p>
        ) : (
          visibleMessages.map((message, i) => {
            const author = getUserById(message.authorId);
            const prev = visibleMessages[i - 1];
            const showHeader =
              !prev ||
              prev.authorId !== message.authorId ||
              new Date(message.createdAt).getTime() - new Date(prev.createdAt).getTime() > 5 * 60 * 1000;

            return (
              <MessageBubble
                key={message.id}
                message={message}
                author={author}
                showHeader={showHeader}
                isOwn={message.authorId === currentUser.id}
                onReply={setReplyTo}
                onReact={react}
              />
            );
          })
        )}
      </div>

      <div className="px-4 pb-4 pt-1 shrink-0">
        {replyTo && (
          <div
            className="flex items-center justify-between px-3 py-1.5 mb-1.5 rounded-lg text-xs"
            style={{ background: "var(--color-bg-elevated)", color: "var(--color-text-secondary)" }}
          >
            <span>
              Replying to <strong>{getUserById(replyTo.authorId)?.name}</strong>: {replyTo.content.slice(0, 60)}
            </span>
            <Button type="text" size="small" icon={<CloseOutlined />} onClick={() => setReplyTo(null)} />
          </div>
        )}
        <div
          className="flex items-end gap-2 px-3 py-2 rounded-xl"
          style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)" }}
        >
          <Tooltip title="Attach (not wired up yet)">
            <Button type="text" shape="circle" size="small" icon={<PaperClipOutlined style={{ color: "var(--color-text-faint)" }} />} />
          </Tooltip>
          <TextArea
            autoSize={{ minRows: 1, maxRows: 6 }}
            placeholder="Message the room…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            variant="borderless"
            style={{ resize: "none", padding: 0 }}
          />
          <Tooltip title="Emoji (not wired up yet)">
            <Button type="text" shape="circle" size="small" icon={<SmileOutlined style={{ color: "var(--color-text-faint)" }} />} />
          </Tooltip>
          <Button type="primary" shape="circle" icon={<SendOutlined />} onClick={send} disabled={!draft.trim()} />
        </div>
      </div>
    </div>
  );
}
