import {
  Breadcrumbs,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import useStyles from "./NavBarStyle";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const NavBar = ({open , toggleDrawer}) => {
    const styleProps = {
        display: open ? "none" : "flex"
    };
    const classes = useStyles(styleProps);
  return (
    <>
      <Paper elevation={0} variant="outlined" square className={classes.root}>
        <Breadcrumbs aria-label="breadcrumb">
          <IconButton className={classes.arrowIcon} onClick={toggleDrawer} >
            <ChevronRightIcon />
          </IconButton>
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/getting-started/installation/"
          >
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
      </Paper>
    </>
  );
};

export default NavBar;
