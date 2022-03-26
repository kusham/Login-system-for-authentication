import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0, 0, 2, 2),
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  profileName: {
    marginLeft: theme.spacing(2),
  },
  icon: (props) => ({
    position: "absolute",
    top: "3%",
    right: "3px",
    display: props.display,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgb(255, 255, 239, 0.5)",
    cursor: "pointer",
    // height: "30px",
    // width: "30px",
  }),
  paper: {
    backgroundColor: "rgb(0, 0, 0)",
  },
  navList: {
    marginTop: theme.spacing(2),
  },
  item: {
    display: "flex",
    alignItems: "top",
    padding: theme.spacing(1, 1.5),
    color: "gray",
    margin: theme.spacing(0, 1, 2, 1),
    borderRadius: theme.spacing(1.5),
    backgroundColor: "rgb(255, 255, 255, 0.1)",
  },
  navText: (props) => ({
    display: props.display,
    alignItems: "center",
    margin: theme.spacing(0.2, 0, 0, 1),
    color: "rgb(255, 255, 255, 0.8)",
  }),
  divider: {
    background: "gray",
    //marginTop: theme.spacing(1),
  },
  iconRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255, 255, 255, 0.4)",
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
  iconRowIcon: {
    backgroundColor: "rgb(255, 255, 255, 0.6)",
    borderRadius: theme.spacing(10),
    height: "30px",
    width: "30px",
    margin: theme.spacing(0, 0.3),
  },
  sideBarFooter: (props) => ({
    display: props.display,
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3, 0.7, 2),
    backgroundColor: "rgb(255, 255, 255, 0.1)",
  }),
  logOutButton: (props) => ({
    display: props.displayLogOut,
    backgroundColor: "rgb(255, 255, 255, 0.4)",
    "&:hover": {
      backgroundColor: "rgb(255, 255, 255, 0.2)",
    },
    margin: theme.spacing(6, 1.5, 0, 1.5),
  }),
}));

export default useStyles;
