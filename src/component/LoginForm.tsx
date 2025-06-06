import React, { useState } from "react";
import "../css/loginform.css";
import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../common/interface";

export const LoginForm: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [popupMsg, setPopupMsg] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  const navigate = useNavigate(); // ✅ initialize

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setPopupMsg({ message: "", type: "" });

    try {
      const res = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        localStorage.setItem("authToken", data?.data?.token); // Save token to localStorage
        setPopupMsg({
          message: "🎉 Login successfully!",
          type: "success",
        });

        // ✅ Redirect to home after slight delay for popup effect
        setTimeout(() => {
          navigate("/home"); // replace with your home route
        }, 1000);
      } else {
        setPopupMsg({
          message: data.message || "❌ Something went wrong!",
          type: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setPopupMsg({
        message: "🚨 Network error. Please try again!",
        type: "error",
      });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

      {popupMsg.message && (
        <div className={`popup-message ${popupMsg.type}`}>
          {popupMsg.message}
        </div>
      )}
      <div className="form-logo">
        <img src="/assets/cinemy-crop.png" alt="App Logo" />
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={loginFormData?.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={loginFormData?.password}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Login</button>

          <p className="signin-link">
            Don't have an account? <Link to="/">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
};
