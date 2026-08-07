"use client";

import { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { User } from "@/types/user";
import { listRooms } from "@/services/room.service";
import { listUsers } from "@/services/user.service";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listRooms()
      .then((data) => {
        if (!cancelled) setRooms(data);
      })
      .catch(() => {
        // Backend not reachable yet — leave the list empty rather than
        // throwing, so the sidebar still renders.
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { rooms, isLoading };
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    listUsers()
      .then((data) => {
        if (!cancelled) setUsers(data);
      })
      .catch(() => {
        // same as above — degrade to an empty list instead of crashing
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { users, isLoading };
}
