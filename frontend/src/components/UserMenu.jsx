import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TextAvatar from "./TextAvatar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/features/userSlice";
import { Link } from "react-router-dom";
import menuConfigs from "../configs/menu.config.js";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { toast } from "react-toastify";
import { createShipInfo } from "../redux/features/cartSlice.js";


const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignout = () => {
    dispatch(clearUser());
    dispatch(createShipInfo(null));
    toast.success("Đăng xuất thành công!");
  };

  return (
    <React.Fragment>
      {
        user && <React.Fragment>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Tài khoản">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <TextAvatar text={user?.name}/>
                <Typography sx={{ marginLeft: "5px", fontSize:"0.875rem", display:{ xs:"none", sm:"block" } }}>{user?.name}</Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuConfigs.user.map((item, index) => (
                <ListItemButton
                  component={Link}
                  to={item.path}
                  key={index}
                  onClick={() => setAnchorElUser(null)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText disableTypography primary={
                    <Typography textTransform="uppercase"
                      sx={{ fontSize:"14px" }}
                    >{item.display}</Typography>
                  } />
                </ListItemButton>
              ))}
              <ListItemButton
                sx={{ borderRadius: "10px" }}
                onClick={handleSignout}
              >
                <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
                <ListItemText disableTypography primary={
                  <Typography textTransform="uppercase"
                    sx={{ fontSize:"14px" }}
                  >Đăng xuất</Typography>
                }/>
              </ListItemButton>
            </Menu>
          </Box>
        </React.Fragment>
      }
    </React.Fragment>
  );
};

export default UserMenu;