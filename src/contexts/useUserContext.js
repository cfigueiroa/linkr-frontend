import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function useUserContext() {
  return useContext(UserContext);
}
