"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type UserData = {
  username: string;
  name: string;
  email: string;
  lastseen: string;
  online: boolean;
};

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
};

const Page = () => {
  const socket = useSocket();
  const [user, setUser] = useState<UserData | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  /* 🔹 Load messages from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  /* 🔹 Save messages on every update */
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  /* 🔹 Fetch user */
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "http://localhost:3001/api/auth/user/694a8a33ef5f9dd44c88373e",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data);
    };

    fetchUser();
  }, []);

  /* 🔹 Send Message */
  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg: Message = {
      id: crypto.randomUUID(),
      text: message,
      sender: "me",
      time: new Date().toISOString(),
    };

    if (socket) {
      socket.emit("message", message);
      setMessage("");
    }

    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-row bg-muted p-4">
      <div className="mb-4 w-full max-w-md mx-auto flex flex-col h-full">
        {/* Sidebar or User List could go here */}
        <Card className="p-4 mb-2 flex justify-center h-16 border-0">
          <h2 className="font-bold text-lg">Chats</h2>
        </Card>

      </div>
      <div className="mb-4 w-full max-w-md mx-auto flex flex-col h-full">
        {/* Header */}
        <Card className="p-4 mb-2 flex justify-between border-0">
          <div>
            <h2 className="font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user?.online ? "Online" : "Offline"}
            </p>
          </div>
        </Card>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-4 rounded-lg m-4">
          <div className="space-y-8">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-auto rounded-lg text-sm ${msg.sender === "me"
                  ? "ml-auto bg-green-500 text-white"
                  : "bg-gray-200"
                  }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs opacity-70 mt-1 text-right">
                  {new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>

    </div >
  );
};

export default Page;
