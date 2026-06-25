import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Notify from "./pages/Notify";
import Auth from "./pages/Auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      
      {/* Public Route */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes */}
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