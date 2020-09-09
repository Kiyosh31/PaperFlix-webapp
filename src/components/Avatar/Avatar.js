import React from "react";
import "./Avatar.css";

import avatar from "assets/img/avatar.png";

const Avatar = () => {
  return (
    <div className="avatar__container">
      <img src={avatar} alt="Paperflix-avatar" />
    </div>
  );
};

export default Avatar;
