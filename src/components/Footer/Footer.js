import React from "react";
import "./Footer.css";

import Sociallinks from "components/Sociallinks/Sociallinks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <Sociallinks />
      <p>
        <FontAwesomeIcon icon={faCopyright} /> 2020 Paperflix, Inc.
      </p>
    </footer>
  );
};

export default Footer;
