import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import Dashboard from "./Components/Dashboard/Dashboard";
import { CssBaseline } from "@mui/material";
//import Buttons from "./Components/Buttons/Buttons";


function App() {
  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/buttons" element={<Buttons />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
