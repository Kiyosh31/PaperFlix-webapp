import React, { useState } from "react";
import "./Row.css";

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
          <div
            className="row__poster"
            onClick={() => modalHandler(paper)}
            key={paper.id_paper}
          >
            <p className="poster__text">{paper.title}</p>
          </div>
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
