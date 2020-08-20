import React, { useState } from "react";
import "./Login.css";

import Logo from "assets/img/logo.png";

const Login = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  return (
    <div className="login">
      <header className="login__header">
        <div className="login__header_inner">
          <img className="login__logo" src={Logo} />
        </div>
      </header>
      <div className="login__box">
        <div className="login__box-inner">
          <h1 className="login__title">Sing In</h1>
          <form>
            <div className="login__input-container">
              <input
                className="login__input"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="login__input-container">
              <input
                className="login__input"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="login__input-container">
              <button className="login__button" type="submit">
                Sign In
              </button>
            </div>
            <div className="login__remember">
              <div className="login__remember_container">
                <span>
                  <input className="login__rememberme" type="checkbox" />
                  <span>Remember me</span>
                </span>
              </div>
            </div>
            <div className="new-to-netflix">
              <p>
                New in Paperflix? <a href="">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
