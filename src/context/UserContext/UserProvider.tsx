import { useState, type PropsWithChildren } from "react";
import { UserContext, type User } from "./UserContext";

export function UserProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([]);

  const generateId = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  const addUser = (newUser: User) => {
    setUsers((prev) => [...prev, { ...newUser, id: generateId() }]);
  };

  const getUser = (id?: number): User => {
    if (typeof id === "number") {
      const user = users.find((user) => id === user.id);
      if (!user) throw new Error("User not Found");
      return user;
    }

    const last = users[users.length - 1];
    if (!last) throw new Error("No users available");
    return last;
  };

  return (
    <UserContext.Provider value={{ users, setUsers, getUser, addUser }}>
      {children}
    </UserContext.Provider>
  );
}
