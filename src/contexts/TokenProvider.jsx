import { createContext } from "react";
import useStickyState from "../hooks/useStickyState";

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useStickyState();
  const value = { token, setToken };
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export default TokenProvider;
