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

  function getCategory() {
    // const category = props.categories.find(
    //   (category) => category.id_category === paper.id_category
    // );
    // return category?.category;
    for (let key in props.categories) {
      if (paper.id_category === props.categories[key].id_category) {
        return props.categories[key].category;
      }
    }
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
        </div>
      ))}

      {paper && (
        <Modal show={modal} modalClosedByBackdrop={modalHandler}>
          <PaperDetail paper={paper} category={getCategory()} />
        </Modal>
      )}
    </div>
  );
};

export default GridPosters;
