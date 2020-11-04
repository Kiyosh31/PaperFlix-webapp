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

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {props.data.map((paper) => (
          <div
            className={props.large ? "row__posterLarge" : "row__poster"}
            onClick={() => modalHandler(paper)}
            key={paper.id_paper}
          >
            <p className="poster__text">{truncate(paper.title, 100)}</p>
          </div>
        ))}
      </div>
      {paper && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          <PaperDetail
            paper={paper}
            category={
              props.categories
                ? props.categories
                    .filter(
                      (category) => category.id_category === paper.id_category
                    )
                    .map((filteredCategory) => filteredCategory.category)
                : props.title
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default Row;
