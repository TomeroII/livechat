"use client";

export default function Footer() {
  return (
    <footer style={{
      background: "#f8f9fa",
      borderTop: "1px solid #e9ecef",
      position: "relative",
      overflow: "hidden",
    }}>
      <div>
        <p className="text-center text-[10px] uppercase tracking-tighter max-w-md" style={{ color: "#6c757d" }}>
          &copy; 2024 Live Chat App. All rights reserved.
        </p>
      </div>
    </footer>
  )
}