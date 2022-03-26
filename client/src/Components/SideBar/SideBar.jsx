import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Home from "@mui/icons-material/Home";
import { Avatar, Grid, Typography } from "@mui/material";
import useStyles from "./SideBarStyle";
import photo from "../../DSC_4340101.JPG";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import DevicesIcon from "@mui/icons-material/Devices";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import { Scrollbars } from 'react-custom-scrollbars-2';

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar = ({ open, toggleDrawer }) => {
  const styleProps = {
    display: open ? "flex" : "none",
    displayLogOut: open ? "none" : "flex",
  };

  const classes = useStyles(styleProps);
 
  return (
    <Box>
      <Drawer
        variant="permanent"
        open={open}
        classes={{ paper: classes.paper }}
      >
        <Grid className={classes.drawerHeader}>
          <Grid className={classes.profile}>
            <Avatar
              src={photo}
              sx={{ mt: "8px", mb: "8px", height: "50px", width: "50px" }}
            />

            <Grid className={classes.profileName}>
              <Typography color={"white"} variant="h6" sx={{ mb: -1 }}>
                Kushan M.
              </Typography>
              <Typography color={"white"} variant="caption">
                HR manager
              </Typography>
            </Grid>
          </Grid>

          <IconButton onClick={toggleDrawer} className={classes.icon}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>

        <Grid className={classes.iconRow}>
          <IconButton className={classes.iconRowIcon}>
            <Home />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <DevicesIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <AccessTimeIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <PaidIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <PeopleAltIcon />
          </IconButton>
          <IconButton className={classes.iconRowIcon}>
            <HowToRegIcon />
          </IconButton>
        </Grid>
        <Divider variant="middle" classes={{ root: classes.divider }} />
        <Divider variant="middle" classes={{ root: classes.divider }} />

        <Scrollbars sx={{ width: 260, height: 300 }}>
        <Grid className={classes.navList}>
          <Grid className={classes.item}>
            <Home />
            <Grid className={classes.navText}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
              >
                <TreeItem nodeId="1" label="Dashboard">
                  <TreeItem nodeId="2" label="" />
                </TreeItem>
              </TreeView>
            </Grid>
          </Grid>

          <Grid className={classes.item}>
              <DevicesIcon />
            <Grid className={classes.navText}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                <TreeItem nodeId="1" label="Assets">
                  <TreeItem nodeId="2" label="add assets" />
                  <TreeItem nodeId="3" label="create fault" />
                </TreeItem>
              </TreeView>
            </Grid>
          </Grid>

          <Grid className={classes.item}>
            <AccessTimeIcon />
            <Grid className={classes.navText}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                <TreeItem nodeId="1" label="Leaves">
                  <TreeItem nodeId="2" label="request leave" />
                  <TreeItem nodeId="3" label="view leave" />
                </TreeItem>
              </TreeView>
            </Grid>
          </Grid>
          <Grid className={classes.item}>
            <PaidIcon />
            <Grid className={classes.navText}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                <TreeItem nodeId="1" label="Payrolls">
                  <TreeItem nodeId="2" label="view salary" />
                  <TreeItem nodeId="3" label="find salary-sheet" />
                </TreeItem>
              </TreeView>
            </Grid>
          </Grid>
          <Grid className={classes.item}>
            <PeopleAltIcon />
            <Grid className={classes.navText}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                <TreeItem nodeId="1" label="Recruitment">
                  <TreeItem nodeId="2" label="create interview" />
                  <TreeItem nodeId="3" label="create candidate" />
                </TreeItem>
              </TreeView>
            </Grid>
          </Grid>
          <Grid className={classes.item}>
            <HowToRegIcon />
            <Grid className={classes.navText}>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                <TreeItem nodeId="1" label="Promotion">
                  <TreeItem nodeId="2" label="history" />
                  <TreeItem nodeId="3" label="promote" />
                </TreeItem>
              </TreeView>
            </Grid>
          </Grid>
        </Grid>
        </Scrollbars>
        

        <Divider variant="middle" classes={{ root: classes.divider }} />
        <Divider variant="middle" classes={{ root: classes.divider }} />

        <Grid>
          <IconButton className={classes.logOutButton}>
            <LogoutIcon />
          </IconButton>
        </Grid>

        <Grid className={classes.sideBarFooter}>
          <Typography variant="body2" color={"white"}>
            DirectFN Ltd.
          </Typography>
          <Typography variant="caption" color={"white"}>
            [Direct Financial Network Company]
          </Typography>
          <Typography variant="subtitle2" color={"white"}>
            DirectFN (c) 2021
          </Typography>
        </Grid>
      </Drawer>
    </Box>
  );
};
export default SideBar;
