"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Form, Input, Button, Tabs, App as AntdApp } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { login as loginRequest, register as registerRequest } from "@/services/auth.service";
import { useAuth } from "@/components/AuthProvider";

type Mode = "login" | "register";

function LoginForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { message } = AntdApp.useApp();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <Form
      layout="vertical"
      onFinish={async (values) => {
        setLoading(true);
        try {
          const user = await loginRequest(values);
          login(user);
          onSubmitted();
        } catch {
          // Backend isn't wired up yet — this is expected until YUH's
          // auth routes/controller are implemented.
          message.info("Backend isn't connected yet — this form is ready to wire up.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
        <Input prefix={<MailOutlined style={{ color: "var(--color-text-faint)" }} />} placeholder="Your email here" size="large" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true, min: 8, message: "At least 8 characters" }]}>
        <Input.Password prefix={<LockOutlined style={{ color: "var(--color-text-faint)" }} />} placeholder="••••••••" size="large" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block size="large" loading={loading}>
        Log in
      </Button>
    </Form>
  );
}

function RegisterForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { message } = AntdApp.useApp();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <Form
      layout="vertical"
      onFinish={async (values) => {
        setLoading(true);
        try {
          const user = await registerRequest({ ...values, role: "member" });
          login(user);
          onSubmitted();
        } catch {
          message.info("Backend isn't connected yet — this form is ready to wire up.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Enter your name" }]}>
        <Input prefix={<UserOutlined style={{ color: "var(--color-text-faint)" }} />} placeholder="Giang" size="large" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
        <Input prefix={<MailOutlined style={{ color: "var(--color-text-faint)" }} />} placeholder="Your email here" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, min: 8, message: "At least 8 characters" }]}
        extra="Hashed with bcrypt before it ever touches the database."
      >
        <Input.Password prefix={<LockOutlined style={{ color: "var(--color-text-faint)" }} />} placeholder="••••••••" size="large" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block size="large" loading={loading}>
        Create account
      </Button>
    </Form>
  );
}

function LoginPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "register" ? "register" : "login");

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-72px)]">
      {/* Brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "var(--color-bg-surface)" }}
      >
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,180,84,0.18), transparent 70%)", filter: "blur(10px)" }}
          aria-hidden
        />
        <Link href="/" className="relative flex items-center gap-0.5">
          <span className="text-2xl italic" style={{ fontFamily: "var(--font-display)", color: "var(--color-amber)", fontWeight: 600 }}>
            Live
          </span>
          <span className="text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Chat
          </span>
        </Link>
        <div className="relative">
          <p className="text-3xl leading-tight mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Connect with your team in real-time.
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-faint)", fontFamily: "var(--font-mono)" }}>
            — StudyHub Capstone, #general
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)" }}>
            {mode === "login" ? "Log in to pick up where your rooms left off." : "Takes less than a minute."}
          </p>

          <Tabs
            activeKey={mode}
            onChange={(k) => setMode(k as Mode)}
            items={[
              { key: "login", label: "Log in", children: <LoginForm onSubmitted={() => router.push("/rooms/")} /> },
              { key: "register", label: "Sign up", children: <RegisterForm onSubmitted={() => router.push("/rooms/")} /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
