import { User } from "@/types";
import { create } from "zustand";

// Define the initial state for the user
const initialState: User = {
  name: "",
  email: "",
  id: "", 
};

type UserType = User & { setUser: (user: Partial<User>) => void };

// Create the zustand store
export const useUserStore = create<UserType>((set) => ({
  ...initialState,
  setUser: (user: Partial<User>) => set((state) => ({ ...state, ...user })),
}));
