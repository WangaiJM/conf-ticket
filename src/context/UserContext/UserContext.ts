import type React from "react";
import { createContext } from "react";

export type User = {
  id?: number;
  fullName: string;
  email: string;
  userName: string;
  avatar: File | null;
};

export type UserContextType = {
  users: User[];
  addUser: (user: User) => void;
  getUser: (id?: number) => User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

export const UserContext = createContext<UserContextType | null>(null);
