"use client";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const socket = useSocket();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", message);
      setMessage("");
    }
  }

  return (
    <div className="flex flex-row min-h-screen items-center justify-center bg-black font-sans">
        <Input className="border-b-black" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant="default" onClick={handleSubmit}>Send Message</Button>
    </div>
  );
}
