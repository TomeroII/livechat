"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { User } from "../types/user";

const STORAGE_KEY = "livechat-auth-user";
const DEFAULT_AVATAR_COLOR = "#6C8EFF";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: Partial<User>) => void;
  logout: () => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

function normalizeUser(nextUser: Partial<User>): User {
  return {
    id: nextUser.id ?? nextUser.email ?? `local-${Date.now()}`,
    name: nextUser.name ?? nextUser.email ?? "User",
    email: nextUser.email ?? "",
    avatarColor: nextUser.avatarColor ?? DEFAULT_AVATAR_COLOR,
    avatarUrl: nextUser.avatarUrl,
    presence: nextUser.presence ?? "online",
    role: nextUser.role,
  };
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? normalizeUser(JSON.parse(stored) as Partial<User>) : null;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });
  const [isLoading] = useState(false);

  const login = useCallback((nextUser: Partial<User>) => {
    const normalizedUser = normalizeUser(nextUser);
    setUser(normalizedUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const requireAuth = useCallback(() => {
    return !!user;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
