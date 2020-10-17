import React from "react";
import "./Footer.css";

import Sociallinks from "components/Sociallinks/Sociallinks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <Sociallinks />
      <p className="copyright">
        <FontAwesomeIcon icon={faCopyright} /> 2020 Paperflix, Inc.
      </p>
      <p>
        Source Of Truth:{" "}
        <a
          className="source_of_truth_link"
          rel="noopener noreferrer"
          target="_blank"
          href="https://arxiv.org/"
        >
          Arxiv.Org
        </a>
      </p>
    </footer>
  );
};

export default Footer;
