import { MenuOutlined } from "@ant-design/icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";
import { MENU_HEADER } from "~/components/constant/Menu";
import "./Drawer.scss";
import { NavLink } from "react-router-dom";
function Drawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };
  return (
    <div className="iconMenu">
      <Button onClick={() => setOpen(true)}>
        <MenuOutlined />
      </Button>

      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List sx={{ maxWidth: 160 }}>
            {MENU_HEADER.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    onClick={() => setOpen(true)}
                    sx={{ minWidth: 40 }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <NavLink to={text.to} key={index}>
                    <ListItemText primary={text.title} />
                  </NavLink>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

export default Drawer;
