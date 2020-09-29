import React from "react";
import "./RegisterLink.css";

import { Link } from "react-router-dom";

const RegisterLink = (props) => {
  return (
    <div className={props.reactivate ? "link__reactivate" : "link__register"}>
      <p>
        {props.question} <Link to={props.navigate}>{props.text}</Link>
      </p>
    </div>
  );
};

export default RegisterLink;
