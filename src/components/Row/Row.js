import React, { useState } from "react";
import "./Row.css";

import mockImage from "assets/img/bojack.jpg";
import Modal from "components/Modal/Modal";
import PaperDetail from "components/PaperDetail/PaperDetail";

const Row = (props) => {
  const [modal, setModal] = useState(false);
  const [paper, setPaper] = useState([]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  function modalHandler(paper) {
    setPaper(paper);
    setModal(!modal);
  }

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row__posters">
        {props.data.map((paper) => (
          <div className="row__poster" onClick={() => modalHandler(paper)}>
            <p style={{ fontSize: "15px" }}>{truncate(paper.title, 50)}</p>
            <p style={{ marginTop: "30px" }}>{truncate(paper.author, 15)}</p>
          </div>
          // <img
          //   key={paper.id_paper}
          //   className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}
          //   src={mockImage}
          //   alt={props.isLargeRow ? paper.title : ""}
          //   onClick={() => modalHandler(paper)}
          // />
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
