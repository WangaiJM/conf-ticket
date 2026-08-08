import { useState, type PropsWithChildren } from "react";
import { UserContext, type User } from "./UserContext";

export function UserProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <UserContext.Provider value={{ users, setUsers, addUser }}>
      {children}
    </UserContext.Provider>
  );
}
