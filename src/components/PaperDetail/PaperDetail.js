import React, { useState, useEffect } from "react";
import "./PaperDetail.css";

import instance from "axios-instance";

const PaperDetail = (props) => {
  const [pdf, setpdf] = useState();

  useEffect(() => {
    const payload = {
      id_paper: props.paper.id_paper,
    };

    instance
      .post("paper/", payload)
      .then((response) => {
        setpdf(response.data);
      })
      .catch((err) => console.log(err));
  }, [props.paper.id_paper]);

  return (
    <div className="paperdetail__container">
      <div className="pdf__container">
        <embed
          width="500"
          height="300"
          src={`data:application/pdf;base64,${pdf}`}
          type="application/pdf"
        />
      </div>
      {/* PDF DESCRIPCION AUTOR AÑO DE PUBLICACION IDIOMA NUMERO DE PAGINAS
      RECOMENDADO DESCRIPCION MAS TITULOS SIMILARES
      {props.paper.id_paper}
      {props.paper.title} */}
    </div>
  );
};

export default PaperDetail;
