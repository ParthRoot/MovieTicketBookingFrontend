import React, { useState } from "react";
import "../css/signupform.css";
import { ISignUpForm } from "../common/interface";

export const SignUpForm: React.FC = () => {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [signUpFormData, setSignUpFormData] = useState<ISignUpForm>({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    mobile_no: "",
    avatar: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [popupMsg, setPopupMsg] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({
    message: "",
    type: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setSignUpFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setPopupMsg({ message: "", type: "" });

    try {
      const res = await fetch("http://localhost:8000/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpFormData),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        setPopupMsg({
          message: "🎉 Sign Up Successful! Welcome aboard!",
          type: "success",
        });
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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
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
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <div className="profile-pic">
            <input
              type="file"
              id="profile_photo"
              accept="image/*"
              onChange={handleProfileChange}
            />
            <label htmlFor="profile_photo">
              <div className="profile-circle">
                {profilePreview && <img src={profilePreview} alt="Profile" />}
              </div>
              <span>Upload Profile Photo</span>
            </label>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                value={signUpFormData.first_name}
                onChange={handleInputChange}
                placeholder="Enter First Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                value={signUpFormData.last_name}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobile_no">Mobile</label>
            <input
              type="tel"
              id="mobile_no"
              value={signUpFormData.mobile_no}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={signUpFormData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={signUpFormData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
            />
          </div>

          <button type="submit">Sign Up</button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
};
