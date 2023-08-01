import "../css/sign.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Maison from "./Maison";
import { useGlobalState } from "../Context";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isLoggedIn, setIsLoggedIn, setProfile } = useGlobalState();

  // Get the history object from useHistory
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log("email", email, "password: ", password);

    try {
      const response = await axios.post(
        "http://localhost/back-end/verify_user.php",
        {
          email,
          pass: password,
        }
      );
      const { success, message, user } = response.data;

      if (success) {
        // User authenticated successfully, perform the necessary actions (e.g., redirect)
        console.log("User authenticated successfully!", user);
        setIsLoggedIn(true);
        setProfile(user);
        navigate("/");
      } else {
        setError(message);
      }
    } catch (error) {
      setError("An error occurred during login.");
      console.error(error);
    }
  };

  return (
    <div className="sign">
      <form className="form" onSubmit={handleSubmit} method="post">
        <p className="title">Sign In </p>
        <p className="message">
          Signin now and get full access to our car catalog.{" "}
        </p>
        <label>
          <input
            required=""
            placeholder=""
            type="email"
            className="input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required=""
            placeholder=""
            type="password"
            className="input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>

        <button className="submit">SignIn</button>
        <p className="signin">
          Don't have an acount ? <Link to="/Sign">Sign Up</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignIn;
