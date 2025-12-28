"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/chat";
import { useAuth } from "@/stores/auth";
import { useEffect } from "react";
import Link from "next/link";

export default function ChatSidebar() {
  const { fetchRooms, rooms } = useChatStore();
  const { user } = useAuth();

  useEffect(() => {
    fetchRooms(user.id);
  }, []);

  return (
    <div className="w-1/4 border-r">
      <ScrollArea className="h-full">
        {rooms.map((r: any) => (
          <Link href={`/chat/${r._id}`}>
            <div className="p-3 hover:bg-accent cursor-pointer">
              {r.roomName}
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
