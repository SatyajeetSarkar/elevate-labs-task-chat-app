import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { api } from "../lib/axios";

type User = {
  username: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
};

// type AuthStore = {
//   user: User | null;
//   fetchUser: (id: string) => Promise<void>;
// };

export const useAuth = create((set) => ({
  user: null,

  login: async (username: string, password: string) => {
    const { data } = await api.post("/auth/login", { username, password });
    const decoded = jwtDecode(data.token);
    set({ user: decoded });
    localStorage.setItem("token", data.token);
  },

  register: async (payload: User) => {
    await api.post("/auth/signup", payload);
  },

  fetchUser: async (id: string) => {
    const token = localStorage.getItem("token");

    const { data } = await api.get(`/auth/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    set({ user: data });
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
    localStorage.removeItem("token");
  },
}));
