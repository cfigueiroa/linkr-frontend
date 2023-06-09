import TokenProvider from "./TokenProvider";
import UserProvider from "./UserProvider";
import RefreshProvider from "./RefreshProvider";

const MainProvider = ({ children }) => {
  return (
    <TokenProvider>
      <UserProvider>
        <RefreshProvider>{children}</RefreshProvider>
      </UserProvider>
    </TokenProvider>
  );
};

export default MainProvider;
