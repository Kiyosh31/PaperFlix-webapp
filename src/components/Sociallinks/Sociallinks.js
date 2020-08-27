import React from "react";
import "./Sociallinks.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Sociallinks = () => {
  return (
    <div className="social__links">
      <FontAwesomeIcon
        icon={faFacebookSquare}
        size="2x"
        className="brand__icon"
      />
      <FontAwesomeIcon icon={faTwitter} size="2x" className="brand__icon" />
      <FontAwesomeIcon icon={faInstagram} size="2x" className="brand__icon" />
      <FontAwesomeIcon icon={faGithub} size="2x" className="brand__icon" />
    </div>
  );
};

export default Sociallinks;
