import { createContext, useState } from "react";

export const RefreshContext = createContext();

const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const value = { refresh, setRefresh };
  return <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>;
};

export default RefreshProvider;
