import { useState, type PropsWithChildren } from "react";
import { UserContext, type User } from "./UserContext";

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User[]>([]);

  const addUser = (newUser: User) => {
    setUser((prev) => [...prev, newUser]);
  };

  return (
    <UserContext.Provider value={{ user, setUser, addUser }}>
      {children}
    </UserContext.Provider>
  );
}
