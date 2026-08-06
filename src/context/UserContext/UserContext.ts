import type React from "react";
import { createContext } from "react";

export type User = {
  name: string;
  email: string;
  username: string;
  avatar: string;
};

export type UserContextType = {
  user: User[];
  addUser: (user: User) => void;
  setUser: React.Dispatch<React.SetStateAction<User[]>>;
};

export const UserContext = createContext<UserContextType | null>(null);
