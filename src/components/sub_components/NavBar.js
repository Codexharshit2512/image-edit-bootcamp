import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../authFunctions";

const NavBar = (props) => {
  const { status } = useSelector((state) => state.auth.user);
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
    props.close();
  };

  const handleLogOut = () => {
    logout();
    props.close();
  };

  return (
    <div className="backdrop">
      <div className="navbar_container">
        <div className="close_btn">
          <span onClick={props.close}>
            <ArrowBackIcon />
          </span>
        </div>
        {status == "Instructor" ? (
          <div className="nav_link" onClick={() => handleClick("/create_task")}>
            Create Task
          </div>
        ) : null}
        <div className="nav_link" onClick={() => handleClick("/")}>
          Dashboard
        </div>
        <div className="nav_link" onClick={handleLogOut}>
          <span className="logout_icon">
            <ExitToAppIcon />
          </span>{" "}
          Log Out
        </div>
      </div>
    </div>
  );
};

export default NavBar;
