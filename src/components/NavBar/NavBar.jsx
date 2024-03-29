import { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";
import SearchBar from "../SearchBar/SearchBar";
import * as S from "./styles";
import useTokenContext from "../../contexts/useTokenContext";
import useUserContext from "../../contexts/useUserContext";
import { Tooltip } from "react-tooltip";

const NavBar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const { token, setToken } = useTokenContext();
  const { user, setUser, followUpdated } = useUserContext();

  const [showLogout, setShowLogout] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    API.getUser(token)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("An error occurred while trying to fetch the user data, please refresh the page", err);
      });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate, setUser, token, followUpdated]);

  const handleToggleMenu = useCallback(() => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  }, [setShowLogout]);

  const handleLogout = useCallback(() => {
    setToken("");
    setUser("");
    navigate("/");
  }, [navigate, setToken, setUser]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <S.ContainerNavBar>
      <S.LogoText onClick={() => navigate("/timeline")}>linkr</S.LogoText>
      <SearchBar header={true} />
      <S.ContainerUserActions ref={menuRef}>
        {showLogout ? (
          <>
            <MdKeyboardArrowUp onClick={handleToggleMenu} />
            <div data-test="menu">
              <p onClick={handleLogout} data-test="logout">
                Logout
              </p>
            </div>
          </>
        ) : (
          <MdKeyboardArrowDown onClick={handleToggleMenu} />
        )}
        <S.ImagePlaceholder style={!imageLoaded ? {} : { display: "none" }} />
        <img
          alt={`${user.username}'s xoxo`}
          src={user.picture}
          onLoad={handleImageLoad}
          onClick={handleToggleMenu}
          data-test="avatar"
          style={!imageLoaded ? { display: "none" } : {}}
          data-tooltip-id="username"
          data-tooltip-content={user.username}
        />
        <Tooltip id="username" />
      </S.ContainerUserActions>
    </S.ContainerNavBar>
  );
};

export default NavBar;
