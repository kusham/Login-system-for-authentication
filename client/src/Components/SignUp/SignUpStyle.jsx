import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  root: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar : {
    margin: '20px'
  },
  form: {
      marginTop: '20px'
  }
}));
export default useStyle;
