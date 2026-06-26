import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Notify from "./pages/Notify";
import Auth from "./pages/Auth";
import ProtectedRoute from "./componenet/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <Notify />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;