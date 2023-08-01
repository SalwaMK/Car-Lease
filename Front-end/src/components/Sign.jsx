import "../css/sign.css";
import SignIn from "./SignIn";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useGlobalState } from "../Context";

const Sign = () => {
  const { setProfile } = useGlobalState();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("creating account");
      const { data } = await axios.post(
        "http://localhost/back-end/register_user.php",
        formData
      );
      console.log("signin response : ", data); // Assuming the PHP back-end returns a JSON response
      setProfile(data.user);
      // Handle success or show a success message
      navigate("/signIn");
    } catch (error) {
      console.error(error);
      // Handle error or show an error message
    }
  };

  return (
    <div className="sign">
      <form className="form" onSubmit={handleSubmit} method="post">
        <p className="title">Register </p>
        <p className="message">
          Signup now and get full access to our car catalog.{" "}
        </p>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            name="username"
            className="input"
            value={formData.username}
            onChange={handleChange}
          />
          <span>User Name</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            name="phone"
            className="input"
            value={formData.phone}
            onChange={handleChange}
          />
          <span>Phone Number</span>
        </label>
        <label>
          <input
            required=""
            placeholder=""
            type="text"
            name="country"
            className="input"
            value={formData.country}
            onChange={handleChange}
          />
          <span>Country</span>
        </label>

        <label>
          <input
            required=""
            placeholder=""
            type="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required=""
            placeholder=""
            type="password"
            name="password"
            className="input"
            value={formData.password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>
        <label>
          <input required="" placeholder="" type="password" className="input" />
          <span>Confirm password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          Already have an acount ? <Link to="/SignIn">Sign In</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Sign;
