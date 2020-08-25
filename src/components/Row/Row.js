import React from "react";
import "./Row.css";

import mockImage from "assets/img/stranger.jpg";

const Row = (props) => {
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {props.data.map((paper) => (
          <img
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            src={mockImage}
            alt={props.isLargeRow ? paper.title : ""}
            key={paper.id_paper}
            onClick={props.clicked}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
