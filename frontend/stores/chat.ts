import { create } from "zustand";
import { api } from "@/lib/axios";

type Member = {
  id: string;
  role: string;
}

type Room = {
  name: string;
  group: boolean;
  members: Member[];
  lastmessage: string;
};

type Message = {
  sender: string;
  chat: string;
  text: string;
  receiver: string;
};

export const useChatStore = create((set) => ({
  rooms: [],
  currentRoom: null,
  messages: [],

  fetchRooms: async (id:string) => {
    const { data } = await api.get(`/rooms/${id}`);
    set({ rooms: data });
  },

  setRoom: (room: Room) => set({ currentRoom: room }),

  fetchMessages: async (id:string) => {
    const { data } = await api.get(`/chat/${id}`);
    set({ messages: data });
  },

  // createMessage: async (payload: Message) =>
  //   await api.post("/chat/create", payload),
}));
