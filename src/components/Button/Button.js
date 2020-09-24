import React from "react";
import "./Button.css";

const Button = (props) => {
  let styles = [];

  if (props.edit) {
    styles.push("button__edit");
  } else if (props.cancel) {
    styles.push("button__cancel");
  } else {
    styles.push("button");
  }

  return (
    <div>
      <div className={props.noContainer ? "" : "button__container"}>
        <button
          className={styles.join(" ")}
          disabled={props.disabled}
          type={props.btnType}
          onClick={props.clicked}
        >
          {props.children}
        </button>
      </div>
    </div>
  );
};

export default Button;
