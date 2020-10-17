import React, { useState } from "react";
import "./GridPosters.css";

import Modal from "components/Modal/Modal";
import PaperDetail from "components/PaperDetail/PaperDetail";

const GridPosters = (props) => {
  const [modal, setModal] = useState(false);
  const [paper, setPaper] = useState(null);

  function modalHandler(paper) {
    setPaper(paper);
    setModal(!modal);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="grid__container">
      {props.data.map((paper) => (
        <div className="grid__box" key={paper.id_paper}>
          <div
            className="grid__poster"
            onClick={() => modalHandler(paper)}
            key={paper.id_paper}
          >
            <p className="grid__poster_text">{truncate(paper.title, 100)}</p>
          </div>
          {/* <img 
            key={paper.id_paper}
            className="grid__poster"
            src={mockImage}
            alt={props.isLargeRow ? paper.title : ""}
            onClick={() => modalHandler(paper)}
          /> */}
        </div>
      ))}

      {paper && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          <PaperDetail paper={paper} categories={props.categories} />
        </Modal>
      )}
    </div>
  );
};

export default GridPosters;
