import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Store";

const theme = createTheme();
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme = {theme}>
    <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
