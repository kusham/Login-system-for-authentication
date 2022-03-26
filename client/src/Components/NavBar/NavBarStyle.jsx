import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        //backgroundColor: "red",
        padding: theme.spacing(2)
    }, 
    arrowIcon : props=> ({
        display : props.display,
        backgroundColor: "rgb(0, 0, 0, 0.2)",
        height : "30px",
        width : "30px",
    })
}))

export default useStyles;