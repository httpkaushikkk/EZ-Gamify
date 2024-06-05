"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Menus from "./menus";

interface MobileDrawerInterface {
  open: boolean;
  toggleDrawer: any;
}

const MobileDrawer: React.FC<MobileDrawerInterface> = ({
  open,
  toggleDrawer,
}) => {
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
       className="h-screen bg-light-primary-mediumBlue/50 dark:bg-dark-primary-boldBlue/90"
    >
      <Menus />
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer} className="">
      {DrawerList}
    </Drawer>
  );
};

export default MobileDrawer;
