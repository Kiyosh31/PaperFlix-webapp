import React, { useState } from "react";
import "./Avatar.css";

import avatar from "assets/img/avatar.png";
import Dropdown from "components/Dropdown/Dropdown";

const Avatar = () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="avatar__container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={avatar} alt="Paperflix-avatar" />
      {hover && <Dropdown />}
    </div>
  );
};

export default Avatar;
