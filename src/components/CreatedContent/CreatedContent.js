import React from "react";

import Button from "components/Button/Button";
import Title from "components/Title/Title";

const CreatedContent = (props) => {
  return (
    <div>
      <Title>{props.title}</Title>
      <p>{props.children}</p>
      <Button clicked={props.clicked}>Cerrar</Button>
    </div>
  );
};

export default CreatedContent;
