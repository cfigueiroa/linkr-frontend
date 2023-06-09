import { useContext } from "react";
import { RefreshContext } from "./RefreshProvider";

export default function useRefreshContext() {
  return useContext(RefreshContext);
}
