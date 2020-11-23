import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

const Header = () => {
  const [navOpen, setOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const open = () => setOpen(true);

  const close = () => setOpen(false);

  return (
    <div className="header_container">
      {isAuthenticated ? (
        <div className="nav_ham_icon">
          <span onClick={open}>
            <MenuIcon />
          </span>
        </div>
      ) : null}
      <div className="app_title">
        <h2>EditImageBootcamp</h2>
      </div>

      {navOpen ? <NavBar close={close} /> : null}
    </div>
  );
};

export default Header;
