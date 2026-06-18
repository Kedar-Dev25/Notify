import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Notify from "./pages/Notify";
import Admin from "./componenet/admin";


function App() {
  return(
    <>
      <Routes>
        <Route path ="/" element = {<Home />}/>
        <Route path = "/notification" element = {<Notify />}/>
      </Routes>
      
    </>
  );
}

export default App;