import { useContext } from "react";
import { TokenContext } from "./TokenProvider";

export default function useTokenContext() {
  return useContext(TokenContext);
}
