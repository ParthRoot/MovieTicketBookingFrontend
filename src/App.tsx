import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SignUpForm } from "./component/SignUpForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./component/LoginForm";
import { PrivateRoute } from "./component/PrivateRoute";
import { Home } from "./component/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Route */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
