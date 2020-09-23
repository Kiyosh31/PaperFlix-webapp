import React, { useState } from "react";
import "./GridPosters.css";

import mockImage from "assets/img/stranger.jpg";
import Modal from "components/Modal/Modal";
import PaperDetail from "components/PaperDetail/PaperDetail";

const GridPosters = (props) => {
  const [modal, setModal] = useState(false);
  const [paper, setPaper] = useState(null);

  function modalHandler(paper) {
    setPaper(paper);
    setModal(!modal);
  }

  return (
    <div className="grid__container">
      <div className="row">
        {props.data.map((paper) => (
          <img
            key={paper.id_paper}
            className="poster"
            src={mockImage}
            alt={props.isLargeRow ? paper.title : ""}
            onClick={() => modalHandler(paper)}
          />
        ))}
      </div>
      {paper && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          <PaperDetail paper={paper} />
        </Modal>
      )}
    </div>
  );
};

export default GridPosters;
