import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [followUpdated, setFollowUpdated] = useState(false);
  const value = { user, setUser, followUpdated, setFollowUpdated };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
