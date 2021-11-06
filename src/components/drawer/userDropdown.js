import React from "react";
import { Power } from "react-feather";
import { useHistory } from "react-router-dom";
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { signout } from '../../actions/auth';


function UserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const history = useHistory();


  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

 

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Power style={{ color:"grey" }}/>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => signout(() => window.location.href="/")}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserDropdown;
