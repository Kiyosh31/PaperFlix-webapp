import React, { useState } from "react";
import "./Row.css";

import mockImage from "assets/img/stranger.jpg";
import Modal from "components/Modal/Modal";
import PaperDetail from "components/PaperDetail/PaperDetail";

const Row = (props) => {
  const [modal, setModal] = useState(false);
  const [paper, setPaper] = useState([]);

  function modalHandler(paper) {
    setPaper(paper);
    setModal(!modal);
  }

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {props.data.map((paper) => (
          // <div
          //   key={paper.id_paper}
          //   className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
          //   onClick={() => modalHandler(paper)}
          // >
          //   {paper.title}
          //   {paper.author}
          // </div>
          <img
            key={paper.id_paper}
            className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
            src={mockImage}
            alt={props.isLargeRow ? paper.title : ""}
            onClick={() => modalHandler(paper)}
          />
        ))}
      </div>
      {paper && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          <PaperDetail paper={paper} category={props.title} />
        </Modal>
      )}
    </div>
  );
};

export default Row;
