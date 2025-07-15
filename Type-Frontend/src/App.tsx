// src/App.tsx
import {  Routes, Route } from "react-router-dom";
import "./App.css";
import Registerpage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import { appRoutes } from "./route/approutes";

function App() {
  return (
      <Routes>
        <Route path={appRoutes.register} element={<Registerpage/>} />
        <Route path={appRoutes.login} element={<LoginPage/>} />
        <Route path={appRoutes.home} element={<Home/>}/>
      </Routes>
  );
}

export default App;
