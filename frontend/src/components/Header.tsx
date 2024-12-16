import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavLink from "./shared/NavLink";

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLink
                bg="#00fffc"
                to="/chat"
                text="Go to chat"
                textcolor="black"
              />
              <NavLink
                bg="#51538f"
                to="/"
                text="Logout"
                textcolor="white"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink
                bg="#00fffc"
                to="/login"
                text="login"
                textcolor="black"
              />
              <NavLink
                bg="#51538f"
                to="/signup"
                text="Signup"
                textcolor="white"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
