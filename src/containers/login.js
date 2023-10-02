import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Router/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  // for login
  const emailRef = useRef();
  const passwordRef = useRef();

  //for register
  const regemailRef = useRef();
  const regpasswordRef = useRef();
  const regphone = useRef();
  const regfname = useRef();
  const reglname = useRef();
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const loginData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://albrecht.pythonanywhere.com/login",
        loginData
      );

      if (response.data) {
        // Assuming the API returns user information along with the token
        setUser(response.data.user_profile);
        alert("succes credentials");
        navigate("/home");
        console.log(user);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in");
    }
  };

  const handleregsiter = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = regemailRef.current.value;
    const password = regpasswordRef.current.value;
    const firstname = regfname.current.value;
    const lastname = reglname.current.value;
    const phone = regphone.current.value;

    const registerData = {
      email,
      password,
      firstname,
      lastname,
      phone ,
    };
    console.log(registerData)
    try {
      const response = await axios.post(
        "http://albrecht.pythonanywhere.com/register",
        registerData
      );

      if (response.data.error) {
        // Assuming the API returns user information along with the token
    
        alert(response.data.error);
  
      
      } else {
        alert("Success");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in");
    }
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };
  return (
    <main className="login">
      <div
        className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      >
        <div className="container__form container--signup">
          <form action="#" className="form" id="form1">
            <h2 className="form__title">Sign Up</h2>
            <input
              type="text"
              placeholder="First Name"
              className="input"
              ref={regfname}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input"
              ref={reglname}
            />
            <input
              type="text"
              placeholder="Phone"
              className="input"
              ref={regphone}
            />
            <input
              type="email"
              placeholder="Email"
              className="input"
              ref={regemailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              ref={regpasswordRef}
            />
            <button className="btn" onClick={handleregsiter}>
              Sign Up
            </button>
          </form>
        </div>

        <div className="container__form container--signin">
          <form className="form" id="form2">
            <h2 className="form__title">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="input"
            />

            <button className="btn" onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </div>

        <div className="container__overlay">
          <div className="overlay">
            <div className="overlay__panel overlay--left">
              <button className="btn" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay__panel overlay--right">
              <button className="btn" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
