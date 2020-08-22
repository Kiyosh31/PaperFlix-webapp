import React, { useState, useEffect } from "react";
import "./Row.css";

import mockImage from "assets/img/stranger.jpg";
import instance from "axios-instance";

const Row = (props) => {
  const [papers, setPapers] = useState([]);

  // Run once when the row loads
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(props.fetchURL);
      setPapers(request.data);
      return request;
    }
    fetchData();
  }, [props.fetchURL]);

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {papers.map((paper) => (
          <img
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            src={mockImage}
            alt={props.isLargeRow ? paper.title : ""}
            key={paper.id_paper}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
